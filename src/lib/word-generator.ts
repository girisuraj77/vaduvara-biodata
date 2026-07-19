import { translations } from "./translations";

const TEMPLATE_COLORS: Record<string, { bg: string; primary: string; accent: string; text: string; label: string }> = {
  "anand-karaj": { bg: "#FFFEF5", primary: "#1A3A6B", accent: "#C8A84B", text: "#1A2E50", label: "#1A3A6B" },
  "anand_karaj": { bg: "#FFFEF5", primary: "#1A3A6B", accent: "#C8A84B", text: "#1A2E50", label: "#1A3A6B" },
  "aura-crimson": { bg: "#5A000A", primary: "#FFE590", accent: "#D4AF37", text: "#FFF3CC", label: "#FFE590" },
  "aura_crimson": { bg: "#5A000A", primary: "#FFE590", accent: "#D4AF37", text: "#FFF3CC", label: "#FFE590" },
  "azure-faith": { bg: "#0A1628", primary: "#E8EFF8", accent: "#D4AF37", text: "#C5D5E8", label: "#E8EFF8" },
  "azure_faith": { bg: "#0A1628", primary: "#E8EFF8", accent: "#D4AF37", text: "#C5D5E8", label: "#E8EFF8" },
  "basic-template": { bg: "#FFFFFF", primary: "#8B0000", accent: "#B8860B", text: "#000000", label: "#000000" },
  "basic_template": { bg: "#FFFFFF", primary: "#8B0000", accent: "#B8860B", text: "#000000", label: "#000000" },
  "simple-leafy": { bg: "#FFFFFF", primary: "#8B0000", accent: "#B8860B", text: "#000000", label: "#000000" },
  "simple_leafy": { bg: "#FFFFFF", primary: "#8B0000", accent: "#B8860B", text: "#000000", label: "#000000" },
  "brown-bird": { bg: "#7A2800", primary: "#FFD070", accent: "#FFE590", text: "#FFF3CC", label: "#FFD070" },
  "brown_bird": { bg: "#7A2800", primary: "#FFD070", accent: "#FFE590", text: "#FFF3CC", label: "#FFD070" },
  "celestial-grace": { bg: "#FEFCFF", primary: "#1E4D8C", accent: "#C8A84B", text: "#2C3E5A", label: "#1E4D8C" },
  "celestial_grace": { bg: "#FEFCFF", primary: "#1E4D8C", accent: "#C8A84B", text: "#2C3E5A", label: "#1E4D8C" },
  "emerald-paradise": { bg: "#FFFDF6", primary: "#064E28", accent: "#D4AF37", text: "#223322", label: "#064E28" },
  "emerald_paradise": { bg: "#FFFDF6", primary: "#064E28", accent: "#D4AF37", text: "#223322", label: "#064E28" },
  "floral-gold": { bg: "#FFFFFF", primary: "#DAA520", accent: "#B8860B", text: "#2D2D2D", label: "#8B6508" },
  "floral_gold": { bg: "#FFFFFF", primary: "#DAA520", accent: "#B8860B", text: "#2D2D2D", label: "#8B6508" },
  "golden-khanda": { bg: "#0D1B3E", primary: "#F5C842", accent: "#C8A030", text: "#E0E8FF", label: "#F5C842" },
  "golden_khanda": { bg: "#0D1B3E", primary: "#F5C842", accent: "#C8A030", text: "#E0E8FF", label: "#F5C842" },
  "imperial-nikah": { bg: "#4A0008", primary: "#FFE590", accent: "#D4AF37", text: "#FFFFFF", label: "#FFE590" },
  "imperial_nikah": { bg: "#4A0008", primary: "#FFE590", accent: "#D4AF37", text: "#FFFFFF", label: "#FFE590" },
  "ivory-chapel": { bg: "#FBF8F0", primary: "#2D5A27", accent: "#B8960C", text: "#2E3D2A", label: "#2D5A27" },
  "ivory_chapel": { bg: "#FBF8F0", primary: "#2D5A27", accent: "#B8960C", text: "#2E3D2A", label: "#2D5A27" },
  "ivory-filigree": { bg: "#FAF0DB", primary: "#7D000B", accent: "#C59B27", text: "#332211", label: "#7D000B" },
  "ivory_filigree": { bg: "#FAF0DB", primary: "#7D000B", accent: "#C59B27", text: "#332211", label: "#7D000B" },
  "marigold-garden": { bg: "#FFFDF9", primary: "#E05A00", accent: "#FFB000", text: "#2B1E19", label: "#E05A00" },
  "marigold_garden": { bg: "#FFFDF9", primary: "#E05A00", accent: "#FFB000", text: "#2B1E19", label: "#E05A00" },
  "midnight-lantern": { bg: "#0B132B", primary: "#E5A99E", accent: "#E5A99E", text: "#FFFFFF", label: "#E5A99E" },
  "midnight_lantern": { bg: "#0B132B", primary: "#E5A99E", accent: "#E5A99E", text: "#FFFFFF", label: "#E5A99E" },
  "modern-teal": { bg: "#61979E", primary: "#FFFFFF", accent: "#E2F1F3", text: "#FFFFFF", label: "#E2F1F3" },
  "modern_teal": { bg: "#61979E", primary: "#FFFFFF", accent: "#E2F1F3", text: "#FFFFFF", label: "#E2F1F3" },
  "punjab-heritage": { bg: "#1B3A1B", primary: "#F5C842", accent: "#C8A030", text: "#D0E8D0", label: "#F5C842" },
  "punjab_heritage": { bg: "#1B3A1B", primary: "#F5C842", accent: "#C8A030", text: "#D0E8D0", label: "#F5C842" },
  "rose-garden": { bg: "#FDF5F5", primary: "#8B2252", accent: "#C59B27", text: "#4A2035", label: "#8B2252" },
  "rose_garden": { bg: "#FDF5F5", primary: "#8B2252", accent: "#C59B27", text: "#4A2035", label: "#8B2252" },
  "royal-amethyst": { bg: "#3F003F", primary: "#FFE590", accent: "#D4AF37", text: "#FFF2D2", label: "#FFE590" },
  "royal_amethyst": { bg: "#3F003F", primary: "#FFE590", accent: "#D4AF37", text: "#FFF2D2", label: "#FFE590" },
  "royal-gold": { bg: "#FFFFFF", primary: "#B8860B", accent: "#D4AF37", text: "#2D2D2D", label: "#B8860B" },
  "royal_gold": { bg: "#FFFFFF", primary: "#B8860B", accent: "#D4AF37", text: "#2D2D2D", label: "#B8860B" },
  "royal-peacock": { bg: "#0B1A30", primary: "#FFE590", accent: "#CD7F32", text: "#FFFFFF", label: "#FFE590" },
  "royal_peacock": { bg: "#0B1A30", primary: "#FFE590", accent: "#CD7F32", text: "#FFFFFF", label: "#FFE590" },
  "saffron-glory": { bg: "#FFF8EE", primary: "#E85D00", accent: "#D4A017", text: "#3D1025", label: "#5A0020" },
  "saffron_glory": { bg: "#FFF8EE", primary: "#E85D00", accent: "#D4A017", text: "#3D1025", label: "#5A0020" },
  "sandstone-grace": { bg: "#FFF9F2", primary: "#2F5233", accent: "#D4AF37", text: "#332211", label: "#2F5233" },
  "sandstone_grace": { bg: "#FFF9F2", primary: "#2F5233", accent: "#D4AF37", text: "#332211", label: "#2F5233" },
  "sanskrit-sandalwood": { bg: "#FAF4E8", primary: "#701A1E", accent: "#C59B27", text: "#33221C", label: "#701A1E" },
  "sanskrit_sandalwood": { bg: "#FAF4E8", primary: "#701A1E", accent: "#C59B27", text: "#33221C", label: "#701A1E" },
  "scarlet-aura": { bg: "#4A0007", primary: "#FFE590", accent: "#D4AF37", text: "#FFFFFF", label: "#FFE590" },
  "scarlet_aura": { bg: "#4A0007", primary: "#FFE590", accent: "#D4AF37", text: "#FFFFFF", label: "#FFE590" },
  "silver-blessing": { bg: "#1C1C2E", primary: "#D0A040", accent: "#D0A040", text: "#C8C8E0", label: "#A8A8C0" },
  "silver_blessing": { bg: "#1C1C2E", primary: "#D0A040", accent: "#D0A040", text: "#C8C8E0", label: "#A8A8C0" },
  "sona-sanskriti": { bg: "#FFFFFF", primary: "#8D1B1B", accent: "#D49E25", text: "#2D2214", label: "#5C462C" },
  "sona_sanskriti": { bg: "#FFFFFF", primary: "#8D1B1B", accent: "#D49E25", text: "#2D2214", label: "#5C462C" },
  "steel-akali": { bg: "#1E2D40", primary: "#FF8C00", accent: "#D4A040", text: "#B8CCE0", label: "#FFB84D" },
  "steel_akali": { bg: "#1E2D40", primary: "#FF8C00", accent: "#4A6080", text: "#B8CCE0", label: "#FFB84D" },
  "temple-lotus": { bg: "#FAF4EC", primary: "#C85A32", accent: "#EAA88C", text: "#3E261D", label: "#C85A32" },
  "temple_lotus": { bg: "#FAF4EC", primary: "#C85A32", accent: "#EAA88C", text: "#3E261D", label: "#C85A32" },
  "traditional-gold": { bg: "#FFF9F0", primary: "#8B0000", accent: "#B8860B", text: "#4A3728", label: "#4A3728" },
  "traditional_gold": { bg: "#FFF9F0", primary: "#8B0000", accent: "#B8860B", text: "#4A3728", label: "#4A3728" },
  "trad-maroon": { bg: "#FFF9F0", primary: "#8B0000", accent: "#B8860B", text: "#4A3728", label: "#4A3728" },
  "trad_maroon": { bg: "#FFF9F0", primary: "#8B0000", accent: "#B8860B", text: "#4A3728", label: "#4A3728" },
  "turquoise-arabesque": { bg: "#FAF6EB", primary: "#115E59", accent: "#D4AF37", text: "#2B1E10", label: "#115E59" },
  "turquoise_arabesque": { bg: "#FAF6EB", primary: "#115E59", accent: "#D4AF37", text: "#2B1E10", label: "#115E59" },
};

async function getBase64ImageFromUrl(imageUrl: string): Promise<string | null> {
  try {
    const res = await fetch(imageUrl);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Failed to convert image to base64", error);
    return null;
  }
}

function wrapBase64(base64: string, lineLength: number = 76): string {
  const matches = base64.match(new RegExp(`.{1,${lineLength}}`, "g"));
  return matches ? matches.join("\r\n") : base64;
}

export function generateWordMhtml(htmlContent: string, images: Record<string, string>) {
  let mhtml = "";
  mhtml += "MIME-Version: 1.0\r\n";
  mhtml += "Content-Type: multipart/related; boundary=\"----Boundary\"; type=\"text/html\"\r\n\r\n";

  // HTML content part
  mhtml += "------Boundary\r\n";
  mhtml += "Content-Type: text/html; charset=\"utf-8\"\r\n";
  mhtml += "Content-Transfer-Encoding: 8bit\r\n\r\n";
  mhtml += htmlContent + "\r\n\r\n";

  // Images content parts
  for (const [location, base64Data] of Object.entries(images)) {
    if (!base64Data) continue;
    const cleanB64 = base64Data.replace(/^data:image\/\w+;base64,/, "");
    const wrappedB64 = wrapBase64(cleanB64);

    mhtml += "------Boundary\r\n";
    mhtml += `Content-Location: ${location}\r\n`;
    mhtml += "Content-Transfer-Encoding: base64\r\n";
    mhtml += `Content-Type: image/png\r\n\r\n`;
    mhtml += wrappedB64 + "\r\n\r\n";
  }

  mhtml += "------Boundary--\r\n";
  return mhtml;
}

function mixColors(colorHex: string, bgHex: string, opacity: number): string {
  const c = colorHex.replace("#", "");
  const b = bgHex.replace("#", "");

  const r1 = parseInt(c.substring(0, 2), 16);
  const g1 = parseInt(c.substring(2, 4), 16);
  const b1 = parseInt(c.substring(4, 6), 16);

  const r2 = parseInt(b.substring(0, 2), 16);
  const g2 = parseInt(b.substring(2, 4), 16);
  const b2 = parseInt(b.substring(4, 6), 16);

  const r = Math.round(r1 * opacity + r2 * (1 - opacity));
  const g = Math.round(g1 * opacity + g2 * (1 - opacity));
  const bl = Math.round(b1 * opacity + b2 * (1 - opacity));

  const rHex = r.toString(16).padStart(2, "0");
  const gHex = g.toString(16).padStart(2, "0");
  const bHex = bl.toString(16).padStart(2, "0");

  return `#${rHex}${gHex}${bHex}`;
}

export function generateWordDocument(
  formData: Record<string, string>,
  stepFields: { 1: any[]; 2: any[]; 3: any[] },
  fieldSettings: Record<string, { include: boolean }>,
  language: string,
  biodataTitle: string,
  godNames: string[],
  showGodName: boolean,
  templateId?: string,
  profilePhotoPath?: string,
  godPhotoPath?: string,
  blankTemplatePath?: string
) {
  const lang = translations[language] ? language : "en";
  const t = translations[lang];

  const colors = TEMPLATE_COLORS[templateId || "traditional_gold"] || TEMPLATE_COLORS["traditional_gold"];
  // Heading line color: accent at ~35% opacity blended with bg (slightly stronger so it shows in Word)
  const headingLineColor = mixColors(colors.accent, colors.bg, 0.35);
  // Row border color: very subtle, primary at ~5% opacity blended with bg (like border-primary/5)
  const rowBorderColor = mixColors(colors.primary, colors.bg, 0.05);

  const getHeaderIcon = (tid: string): string => {
    const id = tid.toLowerCase();
    // These templates have no icon
    if (id.includes("basic") || id.includes("leafy") || id.includes("modern")) return "";
    if (id.includes("sona") || id.includes("sanskrit")) return "✳";
    if (id.includes("turquoise") || id.includes("emerald") || id.includes("khanda") || id.includes("lantern")) return "❖";
    if (id.includes("lotus") || id.includes("karaj") || id.includes("garden") || id.includes("rose")) return "✿";
    if (id.includes("akali") || id.includes("faith") || id.includes("grace") || id.includes("gold") || id.includes("bird")) return "◆";
    return "";
  };
  const icon = getHeaderIcon(templateId || "traditional_gold");

  // Only templates that specifically have a bottom row border
  const borderBearing = [
    "aura-crimson", "aura_crimson",
    "basic-template", "basic_template",
    "simple-leafy", "simple_leafy",
    "floral-gold", "floral_gold",
    "ivory-filigree", "ivory_filigree"
  ];
  const hasRowBorder = borderBearing.includes(templateId || "");
  const borderStyle = hasRowBorder ? `border-bottom: 1px solid ${rowBorderColor};` : "";

  // Title underline bar below BIODATA heading
  const titleUnderlineHtml = `
    <div style="width: 128px; height: 4px; background-color: ${colors.accent}; margin: 0 auto; font-size: 1px; line-height: 1px; border-radius: 2px;">&nbsp;</div>
  `;

  // Helper to translate labels
  const getLabel = (field: any) => {
    if (field.isCustom) {
      return field.customLabel || t.customFieldLabel || "Field";
    }
    return t[field.labelId] || field.labelId;
  };

  // Build sections HTML
  const sections = [
    { title: t.personalDetails || "Personal Details", fields: stepFields[1] },
    { title: t.familyDetails || "Family Details", fields: stepFields[2] },
    { title: t.contactDetails || "Contact Details", fields: stepFields[3] },
  ];

  let bodyContent = "";

  // Spacer at the top of content (to clear the top ornaments)
  bodyContent += `<div style="height: 10px; font-size: 1px; line-height: 1px;">&nbsp;</div>`;

  // God Image / Symbol at the top
  if (godPhotoPath) {
    bodyContent += `
      <div style="text-align: center; margin-bottom: 8px; margin-top: 5px;">
        <img src="${godPhotoPath}" width="50" height="50" style="border: 0; display: inline-block;" alt="Symbol" />
      </div>
    `;
  }

  // God Name / Shloka
  if (showGodName && godNames && godNames[0]) {
    bodyContent += `
      <p style="text-align: center; font-family: 'Calibri', 'Arial', sans-serif; font-size: 10.5pt; font-weight: bold; color: ${colors.primary}; margin: 0 0 8px 0; letter-spacing: 1px;">
        ${godNames[0]}
      </p>
    `;
  }

  // Title with Underline Bar
  bodyContent += `
    <div style="text-align: center; margin-bottom: 15px;">
      <h1 style="font-family: 'Calibri', 'Arial', sans-serif; font-size: 22pt; font-weight: bold; color: ${colors.primary}; margin: 0 0 4px 0; letter-spacing: 2px; text-transform: uppercase;">
        ${biodataTitle || t.biodataTitleDefault || "BIODATA"}
      </h1>
      ${titleUnderlineHtml}
    </div>
  `;

  // Process sections
  sections.forEach((section) => {
    // Filter visible fields
    const visibleFields = section.fields.filter(
      (f) => fieldSettings[f.id]?.include !== false
    );

    if (visibleFields.length === 0) return;

    // Section heading: line — TITLE — line
    // Template: <span className="h-px flex-1" style={{ backgroundColor: colors.accent + "33" }} />
    // Word equivalent: border-top on the td (Word ignores div height:1px but always renders border-top)
    bodyContent += `
      <table width="100%" border="0" cellpadding="0" cellspacing="0" style="width: 100%; margin-top: 16px; margin-bottom: 6px;">
        <tr>
          <td valign="middle" style="border-top: 1px solid ${headingLineColor}; font-size: 0; line-height: 0; padding: 0;">&nbsp;</td>
          <td valign="middle" align="center" style="padding: 0 10px; white-space: nowrap; font-family: 'Calibri', 'Arial', sans-serif; font-size: 9pt; font-weight: bold; color: ${colors.primary}; text-transform: uppercase; letter-spacing: 2px; width: 1%;">
            ${section.title}
          </td>
          <td valign="middle" style="border-top: 1px solid ${headingLineColor}; font-size: 0; line-height: 0; padding: 0;">&nbsp;</td>
        </tr>
      </table>
    `;

    // Build fields html rows
    let fieldsHtml = "";
    visibleFields.forEach((field) => {
      const value = formData[field.id] || "";
      if (!value) return; // Skip empty fields to keep doc clean

      fieldsHtml += `
        <tr>
          <td width="160" valign="top" style="font-family: 'Calibri', 'Arial', sans-serif; font-size: 8pt; font-weight: bold; color: ${colors.label}; text-transform: uppercase; letter-spacing: 1px; padding: 3px 0; ${borderStyle} width: 160px;">
            ${getLabel(field)}:
          </td>
          <td valign="top" style="font-family: 'Calibri', 'Arial', sans-serif; font-size: 10pt; font-weight: bold; color: ${colors.text}; padding: 3px 0; ${borderStyle}">
            ${value}
          </td>
        </tr>
      `;
    });

    // Side-by-side layout for Personal Details if profile photo exists
    if (section.title === (t.personalDetails || "Personal Details") && profilePhotoPath) {
      bodyContent += `
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td width="70%" valign="top" style="width: 70%; padding-right: 15px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                ${fieldsHtml}
              </table>
            </td>
            <td width="30%" valign="top" align="right" style="width: 30%;">
              <table border="0" cellpadding="4" cellspacing="0" style="border: 2px solid ${colors.accent}; background-color: ${colors.bg};">
                <tr>
                  <td style="padding: 0;">
                    <img src="${profilePhotoPath}" width="110" height="138" style="border: 0; display: block;" alt="Profile" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    } else {
      bodyContent += `
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          ${fieldsHtml}
        </table>
      `;
    }
  });

  // Full Word Document HTML wrapper with MS Word styles
  const htmlString = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns:v='urn:schemas-microsoft-com:vml' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <title>Matrimonial Biodata</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        /* Enable VML rendering behaviors in MS Word */
        v\:* { behavior: url(#default#VML); }
        o\:* { behavior: url(#default#VML); }
        w\:* { behavior: url(#default#VML); }
        .shape { behavior: url(#default#VML); }

        @page Section1 {
          size: A4;
          margin: 0.75in 0.7in 0.75in 0.7in;
          mso-header-margin: 0in;
          mso-footer-margin: 0in;
          mso-header: h1;
        }
        div.Section1 {
          page: Section1;
          margin: 0in;
        }
        body {
          font-family: 'Calibri', 'Arial', sans-serif;
          color: ${colors.text};
          background-color: ${colors.bg};
        }
        p, td, th, span {
          font-family: 'Calibri', 'Arial', sans-serif;
          color: ${colors.text};
          line-height: 1.4;
          background-color: transparent;
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Calibri', 'Arial', sans-serif;
          color: ${colors.primary};
        }
      </style>
    </head>
    <body style="background-color: ${colors.bg}; margin: 0; padding: 0;">
      <!--[if gte mso 9]>
      <div style='mso-element:header' id="h1">
        <p class="MsoHeader" style="margin:0;">
          <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="position:absolute;width:8.27in;height:11.69in;left:0;top:0;margin-left:0;margin-top:0;z-index:-2147483648;mso-position-horizontal:absolute;mso-position-horizontal-relative:page;mso-position-vertical:absolute;mso-position-vertical-relative:page;">
            <v:fill type="frame" src="${blankTemplatePath || ''}" color="${colors.bg}" />
            <o:lock v:ext="edit" selection="t" position="t" aspectratio="t"/>
          </v:rect>
        </p>
      </div>
      <![endif]-->
      <div class="Section1">
        ${bodyContent}
      </div>
    </body>
    </html>
  `;

  return htmlString;
}

export async function downloadWordFile(
  filename: string,
  formData: Record<string, string>,
  stepFields: { 1: any[]; 2: any[]; 3: any[] },
  fieldSettings: Record<string, { include: boolean }>,
  language: string,
  biodataTitle: string,
  godNames: string[],
  showGodName: boolean,
  templateId?: string,
  profilePhotoUrl?: string,
  godPhotoId?: string,
  blankTemplateB64?: string
) {
  let godPhotoBase64 = "";
  if (godPhotoId) {
    const url = `/images/gods/${godPhotoId}.png`;
    const b64 = await getBase64ImageFromUrl(url);
    if (b64) godPhotoBase64 = b64;
  } else {
    const b64 = await getBase64ImageFromUrl("/images/gods/god-1.png");
    if (b64) godPhotoBase64 = b64;
  }

  let profilePhotoBase64 = "";
  if (profilePhotoUrl) {
    const b64 = await getBase64ImageFromUrl(profilePhotoUrl);
    if (b64) profilePhotoBase64 = b64;
  }

  // Generate HTML referencing custom content locations
  const htmlContent = generateWordDocument(
    formData,
    stepFields,
    fieldSettings,
    language,
    biodataTitle,
    godNames,
    showGodName,
    templateId,
    profilePhotoBase64 ? "http://template/profile-photo.png" : undefined,
    godPhotoBase64 ? "http://template/god-photo.png" : undefined,
    blankTemplateB64 ? "http://template/background-image.png" : undefined
  );

  // Package resources inside MHTML multipart
  const mhtmlImages: Record<string, string> = {};
  if (blankTemplateB64) mhtmlImages["http://template/background-image.png"] = blankTemplateB64;
  if (profilePhotoBase64) mhtmlImages["http://template/profile-photo.png"] = profilePhotoBase64;
  if (godPhotoBase64) mhtmlImages["http://template/god-photo.png"] = godPhotoBase64;

  const mhtmlContent = generateWordMhtml(htmlContent, mhtmlImages);

  const blob = new Blob([mhtmlContent], {
    type: "application/msword;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename || "Marriage_Biodata"}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
