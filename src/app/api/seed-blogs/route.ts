import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const dummyBlogs = [
    {
      title: "10 Essential Tips to Write a Perfect Marriage Biodata That Stands Out",
      slug: "tips-perfect-marriage-biodata",
      excerpt: "Your matrimonial biodata is your first impression. Learn the 10 professional tips to structure, write, and present your profile to attract compatible matches instantly.",
      metaTitle: "10 Tips to Write a Perfect Marriage Biodata | Matrimonial Guide",
      metaDescription: "Craft a high-converting marriage biodata with our expert guide. Learn layout styling, photo tips, family details presentation, and download premium templates.",
      keywords: "marriage biodata tips, matrimonial biodata format, how to write marriage biodata, biodata templates",
      author: "Marriage Profile Specialist",
      content: `
        <h2>First Impressions Matter: Crafting the Perfect Biodata</h2>
        <p>In the world of arranged marriages and matrimonial searches, your biodata is your representative. It is the very first document a prospective family reads, and it determines whether they will initiate a conversation. Writing a perfect marriage biodata requires a balance of professional details, family legacy, and personal expectations. Here are 10 essential tips to help your profile stand out.</p>

        <div class="my-8 p-6 bg-rose-50 border-l-4 border-rose-500 rounded-r-2xl text-rose-950">
          <strong class="block text-lg mb-2">⭐ Pro Tip for Modern Candidates:</strong>
          Always treat your biodata as a sacred personal brand document. Quality fonts, crisp layouts, and absolute truthfulness establish trust instantly and set a mature tone for the entire matrimonial search.
        </div>

        <h2>1. Start with a High-Quality, Professional Photograph</h2>
        <p>Your photograph is the focal point. Avoid cropped group photos, casual selfies, or pictures with heavy filters. Invest in a high-resolution, semi-formal portrait taken in good natural lighting. A warm, genuine smile projects approachability and maturity.</p>

        <h2>2. Choose a Clean and Elegant Visual Template</h2>
        <p>The visual structure of your profile reflects your taste. Avoid generic black-and-white text sheets. Use professionally designed templates with harmonized colors (like sandalwood gold, royal peacock, or sleek blue) that match your cultural background and keep text highly readable.</p>

        <div class="my-8 overflow-hidden rounded-2xl border border-zinc-200">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-zinc-100 border-b border-zinc-200">
                <th class="p-4 font-black text-sm text-zinc-900">What to Do</th>
                <th class="p-4 font-black text-sm text-zinc-900">What to Avoid</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm text-zinc-600">✔ Use 2 clear columns for layout</td>
                <td class="p-4 text-sm text-zinc-600">❌ Clump everything in a single text block</td>
              </tr>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm text-zinc-600">✔ Incorporate sub-headings & dividers</td>
                <td class="p-4 text-sm text-zinc-600">❌ Use decorative emojis or symbols</td>
              </tr>
              <tr>
                <td class="p-4 text-sm text-zinc-600">✔ Export to vector-scaling PDF</td>
                <td class="p-4 text-sm text-zinc-600">❌ Share as raw editable MS Word doc</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. Prioritize Your Educational Credentials</h2>
        <p>In modern matchmaking, academic pedigree is highly valued. List your highest degree first, specifying the university name, year of graduation, and major. If you graduated from a premier institute (like IIT, IIM, or top medical colleges), highlight it clearly.</p>

        <h2>4. Be Transparent About Career & Financial Stability</h2>
        <p>List your current job designation, employer, and office location. While disclosing your exact annual salary is optional, mentioning a salary bracket or stating your role clearly helps establish financial transparency, which is greatly appreciated by families.</p>

        <h2>5. Structure Your Family Details Elegantly</h2>
        <p>Matrimonial alliances in India represent the coming together of two families. Provide a brief overview of your father's and mother's professions, ancestral native roots, and siblings' career paths. Mentioning extended maternal relationships (Mama's surname) is also a highly respected custom.</p>

        <h2>6. Clearly Define Your Partner Expectations</h2>
        <p>A polite and clear list of preferences prevents mismatched inquiries. State your expectations regarding the prospective partner's education, career choices (working vs homemaker), location adaptability, and core family values.</p>

        <h2>7. Keep the Description Concise and Bulleted</h2>
        <p>Avoid massive paragraphs that are hard to scan. Use clean tables, bold headings, and bulleted lists to break down information. A reader should be able to gather your core details in under 30 seconds.</p>

        <div class="my-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-r-2xl text-red-950">
          <strong class="block text-lg mb-2">⚠ Avoid the 'Typos' Trap:</strong>
          Spelling errors and grammar mistakes on a matrimonial biodata project carelessness. Spend 5 minutes proofreading your files to prevent creating a poor first impression with prospective families.
        </div>

        <h2>8. Retain Control of Your Personal Contact Details</h2>
        <p>Keep your phone number and address private. Modern online builders allow you to generate a secure, private sharing link where you can control who views your biodata and revoke access whenever needed.</p>

        <h2>9. Ensure Mobile Responsiveness</h2>
        <p>Most families read biodatas on WhatsApp. Make sure your document is in a high-quality vector PDF format that scales beautifully on small mobile screens without pixelating or cropping.</p>

        <h2>10. Conclude with a Warm, Humble Invitation</h2>
        <p>Close your biodata with a welcoming statement, indicating your openness to discuss compatibility calmly. This shows you are easy to communicate with and highly approachable for initial parent screening.</p>
      `,
      featuredImage: "/blogs/blog-1.jpg",
      isPublished: true,
    },
    {
      title: "The Ultimate Guide to Rashi, Nakshatra, and Horoscope in Hindu Matrimonial Profiles",
      slug: "understanding-rashi-nakshatra",
      excerpt: "Horoscope matching (Kundli Milan) is key in traditional Hindu marriages. Discover the meaning of Rashi, Nakshatra, Gothra, and how to list them correctly in your biodata.",
      metaTitle: "Rashi, Nakshatra, & Horoscope in Marriage Biodata | Vedic Guide",
      metaDescription: "Learn the importance of Kundli Milan, Rashi, Nakshatra, and Gothra in Hindu marriage profiles. Step-by-step guide to showcasing your astrological details correctly.",
      keywords: "horoscope matching, rashi and nakshatra in biodata, gothra in marriage, kundli milan tips",
      author: "Pandit Shastri / Astrology Advisor",
      content: `
        <h2>The Role of Vedic Astrology in Hindu Matrimony</h2>
        <p>For centuries, Hindu matrimonial traditions have relied on horoscope matching (Kundli Milan) to evaluate compatibility between a prospective bride and groom. While modern profiles emphasize education and career, incorporating your astrological details (like Rashi, Nakshatra, and Gothra) is highly respected and crucial for traditional family vetting.</p>

        <div class="my-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl text-amber-950">
          <strong class="block text-lg mb-2">☀ Astrological Wisdom:</strong>
          Horoscope matching is not about finding matching likes and dislikes, but assessing energetic alignment, physiological health, and future psychological stability. Stating details transparently saves valuable vetting time.
        </div>

        <h2>1. What is Rashi and Nakshatra?</h2>
        <p>Your <strong>Rashi</strong> (zodiac sign) represents the position of the Moon at the exact moment of your birth, governing your emotional temperament and personality. The <strong>Nakshatra</strong> (lunar mansion) breaks this down further into 27 unique divisions, determining your deeper behavioral traits, values, and life cycles (Dashas).</p>

        <h2>2. The Significance of Gothra and Kul</h2>
        <p>In Hindu culture, <strong>Gothra</strong> refers to your paternal lineage traced back to ancient sages. Traditionally, marriages within the same Gothra (Sagotra) are restricted to prevent close genetic overlaps. In addition, listing your <strong>Kul</strong> or family ancestry helps establish clan heritage and societal alignment.</p>

        <h2>3. Demystifying Manglik Status</h2>
        <p>A common astrological parameter is the presence of Manglik Dosha (caused by the alignment of Mars). It is highly helpful to state your Manglik status clearly in your biodata:</p>
        
        <div class="my-8 overflow-hidden rounded-2xl border border-zinc-200">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-zinc-100 border-b border-zinc-200">
                <th class="p-4 font-black text-sm text-zinc-900">Manglik Status</th>
                <th class="p-4 font-black text-sm text-zinc-900">Description & Compatibility</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm font-bold text-zinc-900">Non-Manglik</td>
                <td class="p-4 text-sm text-zinc-600">Standard status, ideal compatibility with all non-Manglik individuals.</td>
              </tr>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm font-bold text-zinc-900">Manglik (Purna)</td>
                <td class="p-4 text-sm text-zinc-600">Mars sits in houses 1, 4, 7, 8, or 12. Ideal compatibility is strictly with other Mangliks.</td>
              </tr>
              <tr>
                <td class="p-4 text-sm font-bold text-zinc-900">Anshik / Partial</td>
                <td class="p-4 text-sm text-zinc-600">Mild Mars influence, often fades by age 28. Compatible with most matches after simple rituals.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>4. Gana and Nadi: The Pillars of Kundli Matching</h2>
        <p>During Kundli Milan, astrologers evaluate 36 aspects (Gunas). Two major pillars of this matching process are:</p>
        <ul>
          <li><strong>Gana:</strong> Divides individuals into Dev (Divine), Manushya (Human), and Rakshas (Demonic), signifying matching temperaments.</li>
          <li><strong>Nadi:</strong> Governs physical health and genetic compatibility. Marrying within the same Nadi (Nadi Dosha) is traditionally restricted to ensure healthy offspring.</li>
        </ul>

        <h2>5. How to Write Astrological Details in Your Biodata</h2>
        <p>Avoid cluttered tables. Create a clean, dedicated column titled <strong>"Astrological Credentials"</strong> and present the facts in a neat bulleted list:</p>
        <ul>
          <li><strong>Date & Time of Birth:</strong> (e.g., 14th June 1995, 09:45 AM)</li>
          <li><strong>Place of Birth:</strong> (e.g., Pune, Maharashtra)</li>
          <li><strong>Rashi & Nakshatra:</strong> (e.g., Simha / Purva Phalguni)</li>
          <li><strong>Gothra:</strong> (e.g., Kashyap Gothra)</li>
          <li><strong>Manglik:</strong> No</li>
        </ul>
        <p>This clean presentation satisfies traditional parents while maintaining a high-fidelity modern aesthetic.</p>
      `,
      featuredImage: "/blogs/blog-2.jpg",
      isPublished: true,
    },
    {
      title: "Modern Minimalist vs. Traditional Decorative: Choosing the Right Matrimonial Template",
      slug: "modern-vs-traditional-templates",
      excerpt: "Which style suits you best? We compare modern minimalist designs with traditional decorative templates and their visual impact.",
      metaTitle: "Modern vs Traditional Marriage Biodata Templates | Design Guide",
      metaDescription: "Unsure which template design to pick? We compare sleek modern minimalist layouts and rich traditional decorative biodata designs for prospective brides and grooms.",
      keywords: "marriage biodata templates, modern biodata vs traditional biodata, biodata layout design, print-ready biodata",
      author: "Creative Design Director",
      content: `
        <h2>Aesthetics of Marriage Profiles: Design Matters</h2>
        <p>When you share your matrimonial biodata, the visual layout is the very first thing families notice, even before they read your name. The design acts as a subconscious indicator of your personality, lifestyle, and cultural values. Today, candidates are split between two distinct design aesthetics: Modern Minimalist and Traditional Decorative.</p>

        <div class="my-8 p-6 bg-slate-50 border-l-4 border-slate-500 rounded-r-2xl text-slate-950">
          <strong class="block text-lg mb-2">🎨 Design Principle:</strong>
          A great matrimonial template balances readability with visual heritage. Too simple can look like a corporate resume; too decorative can distract from your professional credentials.
        </div>

        <h2>1. The Modern Minimalist Style: Sleek and Professional</h2>
        <p>Modern minimalist templates prioritize clean whitespace, elegant Sans-Serif typography, and structured grids. They typically use cool, contemporary color accents (such as corporate navy blue, soft gray, or royal indigo) and avoid decorative symbols or borders.</p>
        <ul>
          <li><strong>Best for:</strong> Corporate professionals, software engineers, doctors, and candidates looking for matching metrics based on intellectual achievements.</li>
          <li><strong>Why it works:</strong> It reads like a premium, executive resume. It projects maturity, order, and global values.</li>
        </ul>

        <h2>2. The Traditional Decorative Style: Culturally Rich</h2>
        <p>Traditional layouts draw inspiration from Indian heritage, incorporating deep warm colors (such as auspicious crimson red, saffron orange, or gold) and traditional motifs like peacock feathers, marigold garlands, and temple borders.</p>
        <ul>
          <li><strong>Best for:</strong> Traditional Vedic matches, regional community platforms (Marathi, Hindu, Gujarati), and families who prioritize cultural roots.</li>
          <li><strong>Why it works:</strong> It evokes a sense of celebration and sacredness. It aligns perfectly with parents' expectations of family-oriented values and heritage.</li>
        </ul>

        <h2>3. Choosing by Career Field</h2>
        <p>To help you choose the best theme alignment, refer to this careers-to-template guide:</p>

        <div class="my-8 overflow-hidden rounded-2xl border border-zinc-200">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-zinc-100 border-b border-zinc-200">
                <th class="p-4 font-black text-sm text-zinc-900">Candidate Industry</th>
                <th class="p-4 font-black text-sm text-zinc-900">Recommended Template Style</th>
                <th class="p-4 font-black text-sm text-zinc-900">Recommended Accent Colors</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm font-bold text-zinc-900">MNC/Tech Professionals</td>
                <td class="p-4 text-sm text-zinc-600">Modern Minimalist</td>
                <td class="p-4 text-sm text-zinc-600">Royal Indigo, Emerald Green</td>
              </tr>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm font-bold text-zinc-900">Family Business Owners</td>
                <td class="p-4 text-sm text-zinc-600">Classic Sandalwood / Sandal Gold</td>
                <td class="p-4 text-sm text-zinc-600">Warm Gold, Saffron, Crimson</td>
              </tr>
              <tr>
                <td class="p-4 text-sm font-bold text-zinc-900">Creative & Arts Sector</td>
                <td class="p-4 text-sm text-zinc-600">Peacock Artistic Motif</td>
                <td class="p-4 text-sm text-zinc-600">Teal Blue, Magenta Purple</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>4. The Bilingual Balance</h2>
        <p>No matter which style you select, ensure that your text formatting remains crisp and print-ready. A layout with too many visual elements can clutter the text, making it hard to scan. Ensure proper margin zones and use vector scaling PDFs to guarantee readable fonts on all devices.</p>
      `,
      featuredImage: "/blogs/blog-3.jpg",
      isPublished: true,
    },
    {
      title: "How to Securely Share Your Matrimonial Biodata on WhatsApp (Avoid PDF Misuse)",
      slug: "securely-share-biodata-whatsapp",
      excerpt: "Stop sending raw PDFs to unknown contacts. Learn the critical privacy risks of matrimonial sharing and how private digital web links are the safer way.",
      metaTitle: "How to Share Marriage Biodata Safely on WhatsApp | Privacy Guide",
      metaDescription: "Protect your personal photos and family details. Discover the security risks of sharing static biodata PDFs on WhatsApp and how dynamic secure links solve privacy.",
      keywords: "share biodata safely on WhatsApp, matrimonial data security, privacy in marriage search, secure biodata link",
      author: "Cybersecurity Analyst",
      content: `
        <h2>The Privacy Trap of Floating Matrimonial PDFs</h2>
        <p>In the digital age, WhatsApp has become the primary platform for exchanging marriage biodatas. While convenient, the habit of sending raw, static PDF files or images to unknown contacts poses significant privacy and security risks. Once you send a PDF, you lose complete control over your personal photograph, career credentials, address, and contact numbers.</p>

        <div class="my-8 p-6 bg-rose-50 border-l-4 border-rose-500 rounded-r-2xl text-rose-950">
          <strong class="block text-lg mb-2">🛡 Cybersecurity Warning:</strong>
          Matrimonial identity fraud is on the rise. A floating PDF contains enough private variables (photo, birth timing, parent names, office location) to let malicious actors create duplicate accounts or launch spear-phishing scams.
        </div>

        <h2>1. The Critical Risks of Static PDF Sharing</h2>
        <p>When you share a raw PDF file or image, keep these high-priority security concerns in mind:</p>
        <ul>
          <li><strong>Uncontrolled Forwarding:</strong> Your profile can be forwarded indefinitely across random WhatsApp groups, relatives, and databases without your knowledge or consent.</li>
          <li><strong>Identity Theft:</strong> Malicious actors can harvest your phone number, parents' details, and professional credentials for phishing scams.</li>
          <li><strong>Outdated Information:</strong> If you change your job, salary, or template design, the outdated PDF is already floating around permanently, leading to mismatched expectations.</li>
        </ul>

        <h2>2. Static PDF vs. Dynamic Secure Web Link</h2>
        <p>Modern developers have built smart secure link sharing algorithms to solve matrimonial privacy. Here is how they stack up:</p>

        <div class="my-8 overflow-hidden rounded-2xl border border-zinc-200">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-zinc-100 border-b border-zinc-200">
                <th class="p-4 font-black text-sm text-zinc-900">Security Metric</th>
                <th class="p-4 font-black text-sm text-zinc-900">Static PDF File</th>
                <th class="p-4 font-black text-sm text-zinc-900">Dynamic Secure Web Link</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm font-bold text-zinc-900">Revoke Access</td>
                <td class="p-4 text-sm text-red-600 font-bold">Impossible (Permanent)</td>
                <td class="p-4 text-sm text-green-600 font-bold">Instantly via Dashboard</td>
              </tr>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm font-bold text-zinc-900">Real-time Edits</td>
                <td class="p-4 text-sm text-red-600 font-bold">Requires creating a new file</td>
                <td class="p-4 text-sm text-green-600 font-bold">Auto-updates on same link</td>
              </tr>
              <tr>
                <td class="p-4 text-sm font-bold text-zinc-900">Access Tracking</td>
                <td class="p-4 text-sm text-red-600 font-bold">No indicators</td>
                <td class="p-4 text-sm text-green-600 font-bold">Logs view counts & logs</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. Tips to Share Your Profile Safely</h2>
        <p>Follow these security guidelines to keep your matrimonial search safe:</p>
        <ul>
          <li><strong>Hide sensitive contact details:</strong> Avoid listing your exact home address. Mention the city and locality instead, sharing the exact address only after initial compatibility checks.</li>
          <li><strong>Use a secondary phone number:</strong> If possible, list a dedicated number for initial parent screening, keeping your personal contact details secure.</li>
          <li><strong>Select high-quality templates:</strong> A premium, clean template design with professional typography ensures you look respectable, allowing you to hide over-revealing data while keeping the profile highly professional.</li>
        </ul>
      `,
      featuredImage: "/blogs/blog-4.jpg",
      isPublished: true,
    },
    {
      title: "What Family Details Should You Include in a Matrimonial Biodata? (Parents, Siblings & Extended Roots)",
      slug: "essential-family-details",
      excerpt: "What should you mention about your parents, siblings, and extended family? Find out the cultural and practical guides to listing your lineage.",
      metaTitle: "How to Write Family Background in Marriage Biodata | Complete Guide",
      metaDescription: "Learn how to structure family credentials, sibling achievements, and maternal lineages (Mama's details) in your matrimonial biodata without cluttering the page.",
      keywords: "family details in marriage biodata, parents occupation biodata, maternal uncle details marriage, family background formatting",
      author: "Family values advisor",
      content: `
        <h2>Why Family Credentials Matter in Matrimonial Searches</h2>
        <p>In Indian culture, a marriage is not just an alliance between two individuals, but a lifelong coming together of two families. Prospective matches look for compatibility in lifestyle, values, and family culture. Presenting your family background elegantly is just as important as listing your career credentials.</p>

        <div class="my-8 p-6 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-2xl text-emerald-950">
          <strong class="block text-lg mb-2">📜 Socio-Cultural Norms:</strong>
          Traditional matchmakers always evaluate "Kul-Gharana" (family prestige). Providing a respectful, clean layout showing ancestral values highlights stability and projects excellent upbringing.
        </div>

        <h2>1. Details of Your Parents</h2>
        <p>Start with your parents' status. Provide a clear and respectful description of their careers and roots:</p>
        <ul>
          <li><strong>Father's Name & Occupation:</strong> (e.g., Mr. Ramesh Patil, Retired Class I Officer / Business Owner in Auto Spares)</li>
          <li><strong>Mother's Name & Occupation:</strong> (e.g., Mrs. Sunita Patil, Homemaker / Principal at High School)</li>
        </ul>
        <p>Specify if they are retired or active in business. If your family has a strong business heritage, mentioning the sector adds high value.</p>

        <h2>2. Siblings' Details and Marital Status</h2>
        <p>List your brothers and sisters in order of birth. Specify their career achievements, university degrees, and marital status:</p>
        <ul>
          <li><strong>Elder Brother:</strong> (e.g., Married, Senior Software Engineer at Google, residing in Seattle)</li>
          <li><strong>Younger Sister:</strong> (e.g., Unmarried, pursuing MBBS at KEM Hospital, Mumbai)</li>
        </ul>

        <div class="my-8 overflow-hidden rounded-2xl border border-zinc-200">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-zinc-100 border-b border-zinc-200">
                <th class="p-4 font-black text-sm text-zinc-900">Family Member</th>
                <th class="p-4 font-black text-sm text-zinc-900">Best Presentation Format</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm font-bold text-zinc-900">Father / Mother</td>
                <td class="p-4 text-sm text-zinc-600">List full names, active profession, and native origins. Avoid just writing "Father: Business".</td>
              </tr>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm font-bold text-zinc-900">Siblings</td>
                <td class="p-4 text-sm text-zinc-600">Mention education, jobs, locations, and whether they are unmarried/married.</td>
              </tr>
              <tr>
                <td class="p-4 text-sm font-bold text-zinc-900">Maternal Uncles</td>
                <td class="p-4 text-sm text-zinc-600">Optionally state their primary surnames and cities of residence for vetting.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. The Maternal Uncle's (Mama's) Lineage</h2>
        <p>In many regional communities (such as Marathi, Hindu, Gujarati, and Telugu), maternal relationships play a significant role. Listing your <strong>Mama's Surname</strong> and their native place (Mosal/Vatan) is a traditional requirement:</p>
        <ul>
          <li><strong>Maternal Uncle (Mama):</strong> (e.g., Mr. Satish Deshmukh, Advocate in Pune High Court)</li>
        </ul>
        <p>This helps families perform traditional background checks and understand extended family trees easily.</p>

        <h2>4. Keeping It Respectful and Structured</h2>
        <p>Use a separate, cleanly designed column or table labeled <strong>"Family Background"</strong>. Avoid cluttered sentences. Group data into neat bullet points:</p>
        <ul>
          <li><strong>Family Structure:</strong> (e.g., Nuclear Family / Traditional Joint Family)</li>
          <li><strong>Ancestral Roots:</strong> (e.g., Native of Kolhapur, Maharashtra, currently settled in Pune)</li>
        </ul>
      `,
      featuredImage: "/blogs/blog-1.jpg",
      isPublished: true,
    },
    {
      title: "How to Describe Your Career Goals and Income in a Professional Marriage Biodata",
      slug: "career-goals-in-biodata",
      excerpt: "Should you mention your future professional plans? Here's how to frame your career journey and financial goals tactfully.",
      metaTitle: "Describing Career Goals and Salary in Matrimonial Biodata",
      metaDescription: "Discover professional ways to mention your annual income, startup goals, corporate tier, and relocation plans on your marriage biodata with absolute tact.",
      keywords: "career in marriage biodata, salary details matrimonial, describe job biodata, career goals matchmaking",
      author: "Career Coach",
      content: `
        <h2>The Value of Career Transparency in Matchmaking</h2>
        <p>Modern matrimonial searches place a high premium on job stability, financial security, and intellectual compatibility. Prospective matches want to understand not just where you work today, but your long-term career trajectory and professional ambition. Presenting your career goals and financial readiness tactfully can significantly increase your response rate.</p>

        <div class="my-8 p-6 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-2xl text-indigo-950">
          <strong class="block text-lg mb-2">💼 Professional Profile Tip:</strong>
          If you are working in high-growth niches (AI engineering, venture capital, medicine, administrative services), mention your specific designation. It clearly defines your academic capability and future stability.
        </div>

        <h2>1. Stating Your Current Job Profile Clearly</h2>
        <p>Avoid ambiguous descriptions. List your exact job designation, corporate tier, and employer name. If you work for a highly recognized multinational or a premier startup, highlight it:</p>
        <ul>
          <li><strong>Designation:</strong> Senior Consultant at Deloitte, Bangalore</li>
          <li><strong>Specialization:</strong> Cloud Security and IT Infrastructure</li>
        </ul>

        <h2>2. How to Address Your Annual Income</h2>
        <p>Disclosing your exact salary can feel uncomfortable. However, financial transparency is highly valued. You can address this in four professional ways:</p>

        <div class="my-8 overflow-hidden rounded-2xl border border-zinc-200">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-zinc-100 border-b border-zinc-200">
                <th class="p-4 font-black text-sm text-zinc-900">Option Type</th>
                <th class="p-4 font-black text-sm text-zinc-900">Format Example</th>
                <th class="p-4 font-black text-sm text-zinc-900">Who Prefers This</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm font-bold text-zinc-900">Exact Salary</td>
                <td class="p-4 text-sm text-zinc-600">"Annual Package: Rs. 18 LPA"</td>
                <td class="p-4 text-sm text-zinc-600">Highly transparent modern couples.</td>
              </tr>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm font-bold text-zinc-900">Salary Range</td>
                <td class="p-4 text-sm text-zinc-600">"Income Bracket: Rs. 15-20 LPA"</td>
                <td class="p-4 text-sm text-zinc-600">Balances privacy and clarity.</td>
              </tr>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm font-bold text-zinc-900">Tier Description</td>
                <td class="p-4 text-sm text-zinc-600">"Well-settled Software Professional"</td>
                <td class="p-4 text-sm text-zinc-600">Elderly family matchmakers.</td>
              </tr>
              <tr>
                <td class="p-4 text-sm font-bold text-zinc-900">Omit entirely</td>
                <td class="p-4 text-sm text-zinc-600">Leave field out, share in private chat.</td>
                <td class="p-4 text-sm text-zinc-600">Privacy-first candidates.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. Pitching Future Career Goals</h2>
        <p>If you are planning to pursue higher studies abroad, launch a business, or transition to a new sector, state it politely under your self-introduction:</p>
        <ul>
          <li><strong>For entrepreneurs:</strong> "Currently managing our family real estate enterprise with plans to expand into green energy next year."</li>
          <li><strong>For higher education:</strong> "Planning to pursue an executive MBA in the UK post-marriage."</li>
        </ul>
        <p>This ensures your partner's life goals align with your future plans, avoiding compatibility friction down the line.</p>
      `,
      featuredImage: "/blogs/blog-2.jpg",
      isPublished: true,
    },
    {
      title: "The Role of Educational Qualifications in First Impressions: Matrimonial Profile Tips",
      slug: "education-role-matrimonial",
      excerpt: "Why your educational background matters more than you think in a first impression and how to display it.",
      metaTitle: "Importance of Education in Marriage Biodata | Profile Tips",
      metaDescription: "Learn why intellectual alignment is vital in modern arranged marriages, and discover tips to showcase your premier college degrees, honors, and certifications.",
      keywords: "education in marriage biodata, intellectual compatibility, academic qualifications matrimonial, premier university biodata",
      author: "Academics & Careers advisor",
      content: `
        <h2>Why Academic Alignment Matters in Arranged Marriages</h2>
        <p>Intellectual compatibility is one of the strongest foundations of a successful marriage. Modern brides and grooms prioritize matches who share similar educational levels, enabling mutual understanding, shared conversations, and collaborative life decisions. Presenting your academic achievements proudly and clearly is highly important.</p>

        <div class="my-8 p-6 bg-cyan-50 border-l-4 border-cyan-500 rounded-r-2xl text-cyan-950">
          <strong class="block text-lg mb-2">🎓 Academic Pedigree:</strong>
          Graduating from premium universities (IIT, IIM, BITS, AIIMS, top NLUs) signals not just intelligence, but outstanding long-term discipline. Present these credentials near the top of your details checklist.
        </div>

        <h2>1. List Your Degrees in Reverse Chronological Order</h2>
        <p>Always list your highest, most recent degree first. Specify the exact degree title, major, and specialization:</p>
        <ul>
          <li><strong>Post-Graduation:</strong> M.Tech in Artificial Intelligence (IIT Bombay)</li>
          <li><strong>Graduation:</strong> B.E. in Computer Science (VJTI, Mumbai)</li>
        </ul>
        <p>If you have additional certifications or qualifications (such as CFA, CA, or medical specialties), highlight them prominently.</p>

        <h2>2. Display Formats for Educational Pedigree</h2>
        <p>Use this recommended structured tabular model to present your academic achievements cleanly:</p>

        <div class="my-8 overflow-hidden rounded-2xl border border-zinc-200">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-zinc-100 border-b border-zinc-200">
                <th class="p-4 font-black text-sm text-zinc-900">Academic Level</th>
                <th class="p-4 font-black text-sm text-zinc-900">Ideal Column Variables</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm font-bold text-zinc-900">Post Graduate</td>
                <td class="p-4 text-sm text-zinc-600">Degree Name, Core Major, University Name, Year of Passing.</td>
              </tr>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm font-bold text-zinc-900">Under Graduate</td>
                <td class="p-4 text-sm text-zinc-600">Bachelors Title, Core Department, College Affiliation, Graduation Year.</td>
              </tr>
              <tr>
                <td class="p-4 text-sm font-bold text-zinc-900">Schooling (Optional)</td>
                <td class="p-4 text-sm text-zinc-600">Class 12th details. Keep school names brief, only list if prestigious.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. Detail Scholastic Honors and Internships</h2>
        <p>If you were a university rank holder, gold medalist, or secured prestigious research fellowships (like under IISc or foreign labs), mention it briefly under a small 'Achievements' sub-heading:</p>
        <ul>
          <li><strong>Achievements:</strong> University Gold Medalist in Civil Engineering / Published 3 research papers in IEEE journals.</li>
        </ul>
      `,
      featuredImage: "/blogs/blog-3.jpg",
      isPublished: true,
    },
    {
      title: "Showcasing Hobbies and Personal Interests in Your Biodata (Make Your Matrimonial Profile Feel Human)",
      slug: "guide-hobbies-interests",
      excerpt: "Make your profile more human by correctly showcasing what you love to do in your free time.",
      metaTitle: "Showcase Hobbies & Interests in Matrimonial Biodata",
      metaDescription: "Stand out from dry statistics. Master the art of describing hobbies, travel choices, and personal values to showcase your unique personality to prospective matches.",
      keywords: "hobbies in marriage biodata, interests matrimonial profile, stand out biodata, unique biodata description",
      author: "Relationship Counsellor",
      content: `
        <h2>Bringing Your Matrimonial Profile to Life</h2>
        <p>A matrimonial biodata filled only with dry statistics (like height, salary, and Rashi) can read like a generic business directory. To attract matches who truly connect with your lifestyle, you must showcase your human side. A well-written <strong>Hobbies & Interests</strong> section acts as a warm invitation, offering a glimpse into your daily personality and sparking meaningful conversations.</p>

        <div class="my-8 p-6 bg-rose-50 border-l-4 border-rose-400 rounded-r-2xl text-rose-950">
          <strong class="block text-lg mb-2">🌟 Human Connection Factor:</strong>
          Shared activities build the strongest marriages. Expressing what brings you joy—cooking Italian dishes, exploring hiking trails, reading historical fiction—makes your biodata memorable and highly relatable.
        </div>

        <h2>1. Be Specific and Authentic</h2>
        <p>Avoid listing generic cliches like "listening to music" or "watching movies." Be descriptive and share what you are passionate about:</p>
        
        <div class="my-8 overflow-hidden rounded-2xl border border-zinc-200">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-zinc-100 border-b border-zinc-200">
                <th class="p-4 font-black text-sm text-zinc-900">Boring Cliche (Avoid)</th>
                <th class="p-4 font-black text-sm text-zinc-900">Engaging Statement (Use Instead)</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm text-red-600">"Reading books"</td>
                <td class="p-4 text-sm text-zinc-600">"Avid reader of ancient history, biographies, and philosophy."</td>
              </tr>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm text-red-600">"Traveling"</td>
                <td class="p-4 text-sm text-zinc-600">"Love high-altitude Himalayan trekking and exploring ancient temple architecture."</td>
              </tr>
              <tr>
                <td class="p-4 text-sm text-red-600">"Listening to music"</td>
                <td class="p-4 text-sm text-zinc-600">"Learning the acoustic guitar, love listening to classical instrumental and ambient music."</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>2. Balance Modern and Traditional Interests</h2>
        <p>If you participate in community volunteering, organic farming, or traditional culinary arts, list them. It shows a mature balance between modern lifestyles and respect for traditional roots:</p>
        <ul>
          <li><strong>Volunteering:</strong> "Regularly volunteer at local animal shelters on weekends."</li>
          <li><strong>Fitness:</strong> "Yoga practitioner and marathon runner."</li>
        </ul>

        <h2>3. Align Hobbies with Your Partner Expectations</h2>
        <p>Your hobbies subconsciously reflect the kind of lifestyle you wish to share with your future partner. If you love weekend road trips, listing it suggests you seek an adventurous partner. If you enjoy home cooking, it projects home-oriented warmth.</p>
      `,
      featuredImage: "/blogs/blog-4.jpg",
      isPublished: true,
    },
    {
      title: "Preparing for the First Family Meeting After Sharing Biodata: Etiquette, Questions & Tips",
      slug: "preparing-first-meeting",
      excerpt: "Tips on what to expect and how to prepare for your first interaction with a potential match and their parents.",
      metaTitle: "Arranged Marriage First Meeting Tips | Family Etiquette",
      metaDescription: "First family meeting after exchanging biodata? Read our complete etiquette guide covering clothes selection, compatibility questions, and polite follow-up tips.",
      keywords: "first family meeting arranged marriage, matrimonial meeting questions, kanda pohe ceremony etiquette, biodata follow up",
      author: "Matrimonial Consultant",
      content: `
        <h2>From Biodata Exchange to Real-Life Connection</h2>
        <p>The exchange of marriage biodatas is followed by the most exciting and crucial milestone: the first family meeting. Whether it is a traditional Maharashtrian 'Kanda-Pohe' ceremony, a formal tea meet at a hotel, or a warm get-together at home, making a positive and respectful first impression is highly important. Here is a guide on how to prepare.</p>

        <div class="my-8 p-6 bg-purple-50 border-l-4 border-purple-500 rounded-r-2xl text-purple-950">
          <strong class="block text-lg mb-2">🍵 First Meeting Wisdom:</strong>
          The goal of a first family meeting is not to decide on marriage immediately, but to verify basic respectfulness, body language alignment, and feel-good levels. Keep the conversation cheerful, light, and humble.
        </div>

        <h2>1. Choose the Right Attire</h2>
        <p>Select clothing that is elegant, neat, and culturally appropriate. Avoid overly casual wear (like t-shirts) or extremely heavy festive garments:</p>
        <ul>
          <li><strong>For Grooms:</strong> A well-fitted semi-formal shirt with trousers or a neat Kurta.</li>
          <li><strong>For Brides:</strong> A classic salwar suit, an elegant saree, or a graceful fusion wear in pastel tones.</li>
        </ul>

        <h2>2. Key Etiquette Vitals</h2>
        <p>Follow these behavioral standards to ensure a respectful encounter for both families:</p>

        <div class="my-8 overflow-hidden rounded-2xl border border-zinc-200">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-zinc-100 border-b border-zinc-200">
                <th class="p-4 font-black text-sm text-zinc-900">Etiquette Parameter</th>
                <th class="p-4 font-black text-sm text-zinc-900">Do's</th>
                <th class="p-4 font-black text-sm text-zinc-900">Don'ts</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm font-bold text-zinc-900">Conversation</td>
                <td class="p-4 text-sm text-zinc-600">Smile, listen actively, let elders speak first.</td>
                <td class="p-4 text-sm text-zinc-600">Interrupt constantly or brag about wealth.</td>
              </tr>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm font-bold text-zinc-900">Mobile Use</td>
                <td class="p-4 text-sm text-zinc-600">Keep on silent, focus completely on the family.</td>
                <td class="p-4 text-sm text-zinc-600">Text, scroll, or receive corporate calls.</td>
              </tr>
              <tr>
                <td class="p-4 text-sm font-bold text-zinc-900">First Decision</td>
                <td class="p-4 text-sm text-zinc-600">Go home, sleep on it, respond within 48 hours.</td>
                <td class="p-4 text-sm text-zinc-600">Say 'Yes' or 'No' on the spot.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. Focus on Compatibility Questions</h2>
        <p>Use your private conversation time to understand core compatibility factors. Ask friendly, open questions:</p>
        <ul>
          <li>"How do you like to spend your weekends?"</li>
          <li>"What are your thoughts on balancing career goals with family life?"</li>
          <li>"Are you open to relocating if career demands change?"</li>
        </ul>
      `,
      featuredImage: "/blogs/blog-1.jpg",
      isPublished: true,
    },
    {
      title: "English vs. Regional Languages: Choosing the Right Language for Your Matrimonial Biodata",
      slug: "importance-language-profile",
      excerpt: "Whether to choose English or your mother tongue? We discuss the pros and cons of both for family screening.",
      metaTitle: "Best Language for Marriage Biodata | English vs Regional Scripts",
      metaDescription: "Decide whether to write your matrimonial profile in English, your regional mother tongue, or create a modern bilingual biodata to satisfy both generations.",
      keywords: "marriage biodata language, english vs marathi biodata, gujarati biodata language, bilingual biodata layout",
      author: "Socio-linguistic Advisor",
      content: `
        <h2>The Language Choices of Indian Matrimony</h2>
        <p>When creating your marriage biodata, one of the most important decisions is choosing the language of your profile. Should you write in global English, or use your native regional script (such as Devnagari Marathi, Gujarati, or Hindi)? The script you choose sets the cultural tone of your matrimonial search, and both choices have unique advantages.</p>

        <div class="my-8 p-6 bg-teal-50 border-l-4 border-teal-500 rounded-r-2xl text-teal-950">
          <strong class="block text-lg mb-2">🔤 Unicode & Font Tip:</strong>
          If you write in regional languages, ensure your builder uses high-quality Unicode fonts. Non-Unicode fonts can turn into unreadable question marks when shared across different mobile operating systems on WhatsApp.
        </div>

        <h2>1. The Case for English: Global and Professional</h2>
        <p>English is the standard choice for modern matrimonial searches. It is universal, professional, and understood across different states. Ideal for highly educated candidates, multinational professionals, and cross-cultural matches. Reads elegantly with clean, modern minimalist templates.</p>

        <h2>2. The Case for Regional Scripts: Culturally Intimate</h2>
        <p>Writing in your mother tongue (e.g., native Marathi or Gujarati) evokes high cultural intimacy and respect for traditions. Highly appreciated by traditional parents, local community coordinators, and regional Samaj matching groups. It instantly highlights your cultural roots.</p>

        <h2>3. Comparison of Language Strategies</h2>
        <p>Evaluate which language model matches your family's expectations:</p>

        <div class="my-8 overflow-hidden rounded-2xl border border-zinc-200">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-zinc-100 border-b border-zinc-200">
                <th class="p-4 font-black text-sm text-zinc-900">Language Strategy</th>
                <th class="p-4 font-black text-sm text-zinc-900">Ideal For</th>
                <th class="p-4 font-black text-sm text-zinc-900">Audience Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm font-bold text-zinc-900">Pure English</td>
                <td class="p-4 text-sm text-zinc-600">Corporate & Urban profiles, IT professionals, NRI matches.</td>
                <td class="p-4 text-sm text-zinc-600">High professional appeal, neutral cultural tone.</td>
              </tr>
              <tr class="border-b border-zinc-100">
                <td class="p-4 text-sm font-bold text-zinc-900">Pure Regional (Devnagari)</td>
                <td class="p-4 text-sm text-zinc-600">Traditional family vetting, local matching groups, village roots.</td>
                <td class="p-4 text-sm text-zinc-600">Extremely high appeal with conservative elders.</td>
              </tr>
              <tr>
                <td class="p-4 text-sm font-bold text-zinc-900">Bilingual (Hybrid)</td>
                <td class="p-4 text-sm text-zinc-600">Candidates seeking modern partners but keeping parents happy.</td>
                <td class="p-4 text-sm text-zinc-600">Perfect balance. Career in English, Astro/Family in native script.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>4. The Bilingual Solution: The Perfect Balance</h2>
        <p>If you want to satisfy both modern prospective matches and conservative grandparents, a bilingual profile is the most recommended choice. Write your Gothra, Devak, and parents' details in your regional language. Write your university degree, company designation, and professional goals in English.</p>
      `,
      featuredImage: "/blogs/blog-2.jpg",
      isPublished: true,
    },
  ];

  try {
    for (const blog of dummyBlogs) {
      await prisma.blog.upsert({
        where: { slug: blog.slug },
        update: blog,
        create: blog,
      });
    }
    return NextResponse.json({ message: "Seed successful" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
