import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { translations } from '@/lib/translations';
import { godShlokas } from '@/lib/god-data';

export type BiodataStep = 1 | 2 | 3 | 'preview';

export interface FieldItem {
  id: string;
  labelId: string; // Key for translations
  customLabel?: string; // For user-added fields
  isCustom?: boolean;
}

export interface BiodataState {
  currentStep: BiodataStep;
  language: 'en' | 'mr' | 'hi' | 'gu' | 'kn' | 'te' | 'ml' | 'bn';
  religion: string;
  godPhotoId: string;
  godPhotoUrl?: string;
  godNames: string[];
  biodataTitle: string;
  profilePhotoUrl?: string;
  showBiodataTitle: boolean;
  showGodPhoto: boolean;
  showGodName: boolean;
  selectedTemplateId: string;
  stepHeadings: Record<number, string>;
  formData: Record<string, string>;
  fieldSettings: Record<string, { include: boolean }>;
  validationErrors: Record<string, string>;
  currentBiodataId: string | null;
  autoDownload?: boolean;

  // Checkout Info
  selectedPlan: string;
  email: string;
  mobile: string;
  hasActivePackage: boolean;

  // Field order for each step
  stepFields: {
    1: FieldItem[];
    2: FieldItem[];
    3: FieldItem[];
  };

  // Actions
  setStep: (step: BiodataStep) => void;
  setLanguage: (lang: 'en' | 'mr' | 'hi' | 'gu' | 'kn' | 'te' | 'ml' | 'bn') => void;
  setReligion: (religion: string) => void;
  setBiodataTitle: (title: string) => void;
  toggleHeaderElement: (element: 'title' | 'photo' | 'name') => void;
  setTemplate: (id: string) => void;
  setStepHeading: (step: number, heading: string) => void;
  updateField: (fieldId: string, value: string) => void;
  updateCustomLabel: (fieldId: string, label: string) => void;
  toggleFieldVisibility: (fieldId: string) => void;
  setGodPhoto: (id: string, name: string) => void;
  setGodPhotoUrl: (url: string) => void;
  setProfilePhotoUrl: (url: string | undefined) => void;
  setGodName: (name: string, index?: number) => void;
  setCheckoutInfo: (info: { plan?: string; email?: string; mobile?: string }) => void;
  setHasActivePackage: (has: boolean) => void;
  setBiodataId: (id: string | null) => void;
  setValidationErrors: (errors: Record<string, string>) => void;


  // Reordering & Dynamic Actions
  moveField: (stepId: 1 | 2 | 3, fieldId: string, direction: 'up' | 'down') => void;
  addCustomField: (stepId: 1 | 2 | 3) => void;
  removeField: (stepId: 1 | 2 | 3, fieldId: string) => void;

  resetForm: () => void;
  loadBiodata: (bio: any, targetStep?: BiodataStep, autoDownload?: boolean) => void;
  setAutoDownload: (val: boolean) => void;
  checkActivePackage: () => Promise<void>;

  // Auth Modal State
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  setAuthModal: (open: boolean, mode?: 'login' | 'signup') => void;
}

const DEFAULT_STEP_1: FieldItem[] = [
  { id: 'fullName', labelId: 'fullName' },
  { id: 'dob', labelId: 'dob' },
  { id: 'height', labelId: 'height' },
  { id: 'birthPlace', labelId: 'birthPlace' },
  { id: 'religion', labelId: 'religion' },
  { id: 'caste', labelId: 'caste' },
  { id: 'rashi', labelId: 'rashi' },
  { id: 'nakshatra', labelId: 'nakshatra' },
  { id: 'manglik', labelId: 'manglik' },
  { id: 'gotra', labelId: 'gotra' },
  { id: 'gan', labelId: 'gan' },
  { id: 'complexion', labelId: 'complexion' },
  { id: 'blood', labelId: 'blood' },
  { id: 'education', labelId: 'education' },
  { id: 'job', labelId: 'job' },
  { id: 'salary', labelId: 'salary' },
];

const DEFAULT_STEP_2: FieldItem[] = [
  { id: 'fatherName', labelId: 'fatherName' },
  { id: 'fatherOccupation', labelId: 'fatherOccupation' },
  { id: 'motherName', labelId: 'motherName' },
  { id: 'motherOccupation', labelId: 'motherOccupation' },
  { id: 'sisters', labelId: 'sisters' },
  { id: 'brothers', labelId: 'brothers' },
  { id: 'mama', labelId: 'mama' },
  { id: 'nativePlace', labelId: 'nativePlace' },
];

const DEFAULT_STEP_3: FieldItem[] = [
  { id: 'mobile', labelId: 'mobile' },
  { id: 'email', labelId: 'email' },
  { id: 'address', labelId: 'address' },
];

let validationTimeoutId: any = null;

export const useBuilderStore = create<BiodataState>()(
  persist(
    (set) => ({
      currentStep: 1,
      language: 'en',
      religion: 'Hindu',
      godPhotoId: 'god-1',
      godNames: [godShlokas.en[0]],
      biodataTitle: translations.en.biodataTitleDefault,
      profilePhotoUrl: undefined,
      showBiodataTitle: true,
      showGodPhoto: true,
      showGodName: true,
      selectedTemplateId: 'simple_leafy',
      stepHeadings: {},
      formData: {},
      fieldSettings: {},
      validationErrors: {},
      currentBiodataId: null,

      selectedPlan: 'word',
      email: '',
      mobile: '',
      hasActivePackage: false,
      stepFields: {
        1: [...DEFAULT_STEP_1],
        2: [...DEFAULT_STEP_2],
        3: [...DEFAULT_STEP_3],
      },

      setStep: (step) => set({ currentStep: step }),
      setLanguage: (lang) => set((state) => {
        const newT = translations[lang];
        if (!newT) return state;

        const currentLanguageShlokas = godShlokas[lang] || godShlokas.en;
        const defaultShloka = currentLanguageShlokas[0];

        // Legacy/alternative default values to handle transitions
        const legacyTitles = ['BIODATA', 'बायोडेटा'];
        const legacyShlokas = [
          '|| Shree Ganeshay Namah ||',
          '॥ श्री गणेशाय नम: ॥',
          '॥ श्री गणेशाय नमः ॥',
          '॥ Jai Shree Ganeshya Namah ॥'
        ];

        // Update Title if it's currently a default
        const isDefaultTitle = state.biodataTitle === translations[state.language]?.biodataTitleDefault ||
          Object.values(translations).some(t => t.biodataTitleDefault === state.biodataTitle) ||
          legacyTitles.includes(state.biodataTitle);
        const newTitle = isDefaultTitle ? newT.biodataTitleDefault : state.biodataTitle;

        // Update Shloka if it's currently a default (check against ALL shlokas in ALL languages)
        const newGodNames = [...state.godNames];
        const isDefaultShloka = legacyShlokas.includes(newGodNames[0]) ||
          Object.values(godShlokas).some((list: any) => list.includes(newGodNames[0]));

        if (isDefaultShloka) {
          newGodNames[0] = defaultShloka;
        }

        return {
          language: lang,
          biodataTitle: newTitle,
          godNames: newGodNames
        };
      }),
      setReligion: (religion) => set({ religion }),
      setBiodataTitle: (title) => set({ biodataTitle: title }),
      toggleHeaderElement: (element) =>
        set((state) => ({
          showBiodataTitle: element === 'title' ? !state.showBiodataTitle : state.showBiodataTitle,
          showGodPhoto: element === 'photo' ? !state.showGodPhoto : state.showGodPhoto,
          showGodName: element === 'name' ? !state.showGodName : state.showGodName,
        })),
      setTemplate: (id) => set({ selectedTemplateId: id }),
      setStepHeading: (step, heading) =>
        set((state) => ({
          stepHeadings: { ...state.stepHeadings, [step]: heading }
        })),
      updateField: (fieldId, value) =>
        set((state) => ({
          formData: { ...state.formData, [fieldId]: value },
          validationErrors: { ...state.validationErrors, [fieldId]: "" }
        })),

      updateCustomLabel: (fieldId, label) =>
        set((state) => {
          const newStepFields = { ...state.stepFields };
          for (const step in newStepFields) {
            newStepFields[step as any as 1 | 2 | 3] = newStepFields[step as any as 1 | 2 | 3].map(f =>
              f.id === fieldId ? { ...f, customLabel: label } : f
            );
          }
          return { stepFields: newStepFields };
        }),
      toggleFieldVisibility: (fieldId) =>
        set((state) => ({
          fieldSettings: {
            ...state.fieldSettings,
            [fieldId]: { include: !(state.fieldSettings[fieldId]?.include ?? true) }
          }
        })),
      setGodPhoto: (id, name) => set((state) => {
        const newNames = [...state.godNames];
        newNames[0] = name; // Only update the first shloka to match the new icon
        return {
          godPhotoId: id,
          godNames: newNames,
          godPhotoUrl: undefined
        };
      }),
      setGodPhotoUrl: (url) => set({ godPhotoUrl: url, godPhotoId: 'custom' }),
      setProfilePhotoUrl: (url) => set({ profilePhotoUrl: url }),
      setGodName: (name, index = 0) => set((state) => {
        const newNames = [...state.godNames];
        newNames[index] = name;
        return { godNames: newNames };
      }),
      setCheckoutInfo: (info) => set((state) => ({
        selectedPlan: info.plan !== undefined ? info.plan : state.selectedPlan,
        email: info.email !== undefined ? info.email : state.email,
        mobile: info.mobile !== undefined ? info.mobile : state.mobile,
      })),
      setHasActivePackage: (has) => set({ hasActivePackage: has }),
      setBiodataId: (id) => set({ currentBiodataId: id }),
      setValidationErrors: (errors) => {
        set({ validationErrors: errors });
        if (validationTimeoutId) {
          clearTimeout(validationTimeoutId);
          validationTimeoutId = null;
        }
        if (Object.keys(errors).length > 0) {
          validationTimeoutId = setTimeout(() => {
            set({ validationErrors: {} });
            validationTimeoutId = null;
          }, 300000);
        }
      },


      moveField: (stepId, fieldId, direction) =>
        set((state) => {
          const fields = [...state.stepFields[stepId]];
          const index = fields.findIndex(f => f.id === fieldId);
          if (index === -1) return state;

          const newIndex = direction === 'up' ? index - 1 : index + 1;
          if (newIndex < 0 || newIndex >= fields.length) return state;

          // Swap positions
          [fields[index], fields[newIndex]] = [fields[newIndex], fields[index]];

          return {
            stepFields: {
              ...state.stepFields,
              [stepId]: fields
            }
          };
        }),

      addCustomField: (stepId) =>
        set((state) => {
          const newId = `custom_${Date.now()}`;
          const t = translations[state.language];
          return {
            stepFields: {
              ...state.stepFields,
              [stepId]: [
                ...state.stepFields[stepId],
                {
                  id: newId,
                  labelId: 'customFieldLabel',
                  isCustom: true,
                  customLabel: t.customFieldLabel || 'Custom Field'
                }
              ]
            }
          };
        }),

      removeField: (stepId, fieldId) =>
        set((state) => ({
          stepFields: {
            ...state.stepFields,
            [stepId]: state.stepFields[stepId].filter(f => f.id !== fieldId)
          }
        })),

      resetForm: () => set((state) => {
        const t = translations[state.language] || translations.en;
        const currentLanguageShlokas = godShlokas[state.language] || godShlokas.en;

        return {
          currentStep: 1,
          religion: 'Hindu',
          godPhotoId: 'god-1',
          godNames: [currentLanguageShlokas[0]],
          biodataTitle: t.biodataTitleDefault,
          profilePhotoUrl: undefined,
          formData: {},
          fieldSettings: {},
          validationErrors: {},
          currentBiodataId: null,
          stepHeadings: {},

          godPhotoUrl: undefined,
          showBiodataTitle: true,
          showGodPhoto: true,
          showGodName: true,
          selectedTemplateId: 'trad_maroon',
          stepFields: {
            1: [...DEFAULT_STEP_1],
            2: [...DEFAULT_STEP_2],
            3: [...DEFAULT_STEP_3],
          },
        };
      }),

      loadBiodata: (bio, targetStep = 1, autoDownload = false) => set((state) => {
        const bioData = bio.data || {};
        return {
          currentBiodataId: bio.id,
          language: (bio.language as any) || 'en',
          biodataTitle: bio.title || bioData.biodataTitle || 'BIODATA',
          formData: bioData,
          selectedTemplateId: bio.template || 'simple_leafy',
          profilePhotoUrl: bioData.profilePhotoUrl || undefined,
          religion: bioData.religion || 'Hindu',
          godPhotoId: bioData.godPhotoId || 'god-1',
          godNames: bioData.godNames || [godShlokas.en[0]],
          stepHeadings: bioData.stepHeadings || {},
          stepFields: bioData.stepFields || {
            1: [...DEFAULT_STEP_1],
            2: [...DEFAULT_STEP_2],
            3: [...DEFAULT_STEP_3],
          },
          fieldSettings: bioData.fieldSettings || {},
          validationErrors: {},
          currentStep: targetStep,
          autoDownload: autoDownload,
          hasActivePackage: !bio.isDraft
        };
      }),

      setAutoDownload: (val) => set({ autoDownload: val }),

      checkActivePackage: async () => {
        // Direct checkout only: active packages are verified reactively via localStorage or admin roles
      },

      // Auth Modal
      isAuthModalOpen: false,
      authModalMode: 'login',
      setAuthModal: (open, mode = 'login') => set({ isAuthModalOpen: open, authModalMode: mode }),
    }),
    {
      name: 'biodata-builder-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        const {
          isAuthModalOpen,
          authModalMode,
          setAuthModal,
          validationErrors,
          ...rest
        } = state;
        return rest;
      },
    }
  )
);
