"use client";

import { useBuilderStore } from "@/store/builder-store";
import { translations } from "@/lib/translations";
import { godShlokas } from "@/lib/god-data";
import { getDummyBiodata } from "@/lib/dummy-biodata-list";

/**
 * Shared logic for preparing biodata for template rendering.
 * Can be used by hooks (builder) or directly by passing data (public share page).
 */
export function getTemplateData(sourceData: any, community?: string) {
  const language = sourceData.language || 'en';
  const t = translations[language] || translations.en;

  // If the user hasn't typed anything, use dummy data for the gallery/preview
  // (Only applies if we're in the builder context)
  const hasData = sourceData.formData && Object.values(sourceData.formData).some(val => !!val);
  const isPreviewPage = typeof window !== 'undefined' && window.location.pathname.includes('/preview');
  const isEmpty = !hasData && !sourceData.isShared && !isPreviewPage; // shared data and standalone preview shouldn't fall back to dummy


  // Community detection mapping based on template ID
  const templateCommunityMap: Record<string, string> = {
    // Muslim templates
    'emerald-paradise': 'Muslim', 'emerald_paradise': 'Muslim',
    'turquoise-arabesque': 'Muslim', 'turquoise_arabesque': 'Muslim',
    'midnight-lantern': 'Muslim', 'midnight_lantern': 'Muslim',
    'sandstone-grace': 'Muslim', 'sandstone_grace': 'Muslim',
    'imperial-nikah': 'Muslim', 'imperial_nikah': 'Muslim',
    // Christian templates
    'celestial-grace': 'Christian', 'celestial_grace': 'Christian',
    'ivory-chapel': 'Christian', 'ivory_chapel': 'Christian',
    'azure-faith': 'Christian', 'azure_faith': 'Christian',
    'silver-blessing': 'Christian', 'silver_blessing': 'Christian',
    // Multi-community: Christian + Hindu
    'rose-garden': 'Christian,Hindu', 'rose_garden': 'Christian,Hindu',
    // Sikh templates
    'golden-khanda': 'Sikh', 'golden_khanda': 'Sikh',
    'saffron-glory': 'Sikh', 'saffron_glory': 'Sikh',
    'anand-karaj': 'Sikh', 'anand_karaj': 'Sikh',
    'steel-akali': 'Sikh', 'steel_akali': 'Sikh',
    // Multi-community: Sikh + Hindu
    'punjab-heritage': 'Sikh,Hindu', 'punjab_heritage': 'Sikh,Hindu',
    // New Hindu templates
    'aura-crimson': 'Hindu', 'aura_crimson': 'Hindu',
    'sanskrit-sandalwood': 'Hindu', 'sanskrit_sandalwood': 'Hindu',
    'marigold-garden': 'Hindu', 'marigold_garden': 'Hindu',
    'royal-peacock': 'Hindu', 'royal_peacock': 'Hindu',
    'temple-lotus': 'Hindu', 'temple_lotus': 'Hindu',
  };

  const activeTemplateId = sourceData.selectedTemplateId || sourceData.template || '';
  const templateCommunity = templateCommunityMap[activeTemplateId.toLowerCase()] || '';

  let resolvedCommunity = community || '';
  if (!resolvedCommunity) {
    const storeReligion = (sourceData.religion || '').toLowerCase();

    // If the template supports multiple communities (comma-separated)
    if (templateCommunity.includes(',')) {
      const supported = templateCommunity.split(',').map(s => s.trim().toLowerCase());
      // Match active store religion against supported communities
      const matched = supported.find(sup => storeReligion.includes(sup) || sup.includes(storeReligion));
      if (matched) {
        resolvedCommunity = sourceData.religion; // Prioritize user's active choice
      } else {
        resolvedCommunity = templateCommunity.split(',')[0].trim(); // Fallback to first
      }
    } else {
      resolvedCommunity = templateCommunity || sourceData.religion || sourceData._community || 'Hindu';
    }
  }

  // Pick the right dummy data based on resolved community
  const fallbackDummy = getDummyBiodata(resolvedCommunity);


  // Create a localized version of dummy data if needed
  const activeData = isEmpty ? {
    ...fallbackDummy,
    formData: language === 'kn' ? {
      ...fallbackDummy.formData,
      fullName: "ರಾಜೇಶ್ ಕುಮಾರ್",
      religion: "ಹಿಂದೂ",
      caste: "ಬ್ರಾಹ್ಮಣ",
      job: "ಸಾಫ್ಟ್‌ವೇರ್ ಇಂಜಿನಿಯರ್",
      address: "ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ"
    } : fallbackDummy.formData,
    biodataTitle: t.biodataTitleDefault,
    stepHeadings: {
      1: t.personalDetails,
      2: t.familyDetails,
      3: t.contactDetails
    }
  } : sourceData;

  // Helper to filter and prepare fields for a specific step
  const getVisibleFields = (step: 1 | 2 | 3) => {
    // Handle both number and string keys (e.g., "1" or 1)
    const stepFields = activeData.stepFields || {};
    const fields = stepFields[step] || stepFields[String(step)] || [];

    return fields.filter((f: any) => {
      // Must be explicitly included AND have data
      const fieldSettings = activeData.fieldSettings || {};
      const setting = fieldSettings[f.id] || {};
      const isIncluded = setting.include ?? true;

      const formData = activeData.formData || {};
      const hasValue = !!formData[f.id];

      return isIncluded && hasValue;
    }).map((f: any) => {
      // Priority: 1. User's custom label, 2. Translation lookup, 3. Hardcoded labelId fallback
      const translatedLabel = t[f.labelId] || t.customFieldLabel || f.labelId;
      return {
        ...f,
        label: f.customLabel || translatedLabel,
        value: (activeData.formData as any)[f.id]
      };
    });
  };

  const getStepHeading = (step: 1 | 2 | 3) => {
    const headings = activeData.stepHeadings || {};
    return headings[step] || headings[String(step)];
  };

  const userRel = (activeData.religion || activeData.formData?.religion || "Hindu").trim().toLowerCase();
  let defaultShloka = (godShlokas[language] || godShlokas.en)[0];
  if (["islam", "इस्लाम"].includes(userRel)) {
    defaultShloka = "";
  } else if (["sikh", "सिख"].includes(userRel)) {
    defaultShloka = language === 'mr' || language === 'hi' ? "॥ ੴ वाहेगुरु ॥" : "॥ Ek Onkar ॥";
  } else if (["christian", "क्रिश्चियन", "ख्रिश्चन"].includes(userRel)) {
    defaultShloka = language === 'mr' ? "॥ प्रेज द लॉर्ड ॥" : language === 'hi' ? "॥ प्रेज द लॉर्ड ॥" : "॥ Praise the Lord ॥";
  }

  // Determine if the user's selected god photo is Ganesha ("god-1")
  // and they are previewing a template of a different community.
  // In this case, we swap the ID to "god-ganesha-default" to bypass hardcoded community overrides.
  let resolvedGodPhotoId = activeData.godPhotoId;
  if (resolvedGodPhotoId === "god-1") {
    const isUserMuslim = userRel.includes("muslim") || userRel.includes("islam");
    const isUserSikh = userRel.includes("sikh");
    const isUserChristian = userRel.includes("christian");

    // Detect template community context
    const isMuslimTemplate = [
      'emerald-paradise', 'emerald_paradise',
      'turquoise-arabesque', 'turquoise_arabesque',
      'midnight-lantern', 'midnight_lantern',
      'sandstone-grace', 'sandstone_grace',
      'imperial-nikah', 'imperial_nikah'
    ].includes(activeTemplateId.toLowerCase());

    const isSikhTemplate = [
      'golden-khanda', 'golden_khanda',
      'saffron-glory', 'saffron_glory',
      'anand-karaj', 'anand_karaj',
      'steel-akali', 'steel_akali',
      'punjab-heritage', 'punjab_heritage'
    ].includes(activeTemplateId.toLowerCase());

    const isChristianTemplate = [
      'celestial-grace', 'celestial_grace',
      'ivory-chapel', 'ivory_chapel',
      'azure-faith', 'azure_faith',
      'silver-blessing', 'silver_blessing',
      'rose-garden', 'rose_garden'
    ].includes(activeTemplateId.toLowerCase());

    // If the template belongs to a community different from the user's active religion,
    // and the user has "god-1" selected, we swap it to "god-ganesha-default" so Ganesha renders!
    const isMismatch = (isMuslimTemplate && !isUserMuslim) || 
                       (isSikhTemplate && !isUserSikh) || 
                       (isChristianTemplate && !isUserChristian);

    if (isMismatch) {
      resolvedGodPhotoId = "god-ganesha-default";
    }
  }

  return {
    // Raw Data
    ...activeData,
    godPhotoId: resolvedGodPhotoId,

    // Prepared Design Data
    t,
    personalFields: getVisibleFields(1),
    familyFields: getVisibleFields(2),
    contactFields: getVisibleFields(3),
    stepHeadings: {
      1: getStepHeading(1) || t.personalDetails,
      2: getStepHeading(2) || t.familyDetails,
      3: getStepHeading(3) || t.contactDetails,
    },

    // Helpers
    hasPersonal: getVisibleFields(1).length > 0,
    hasFamily: getVisibleFields(2).length > 0,
    hasContact: getVisibleFields(3).length > 0,

    // Fallbacks
    shloka: activeData.godNames?.[0] || defaultShloka,
    showGodPhoto: activeData.showGodPhoto ?? true,
  };
}

export function useTemplateData() {
  const store = useBuilderStore();
  return getTemplateData(store);
}
