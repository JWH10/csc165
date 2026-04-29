import { Router, Request, Response } from 'express';

const router = Router();

interface ChatRequest {
  message: string;
}

function getResponse(message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes('gym') || msg.includes('wellness') || msg.includes('fitness') || msg.includes('peloton') || msg.includes('headspace')) {
    return `💪 **Gym & Wellness Reimbursement** — You have $600 available and 0% used!\n\nHere's how to claim it:\n1. Save receipts for gym membership, fitness classes, or wellness apps\n2. Log into **Workday Benefits Portal**\n3. Navigate to "Expense Reports" → "Wellness Reimbursement"\n4. Upload your receipts (PDF or photo)\n5. Reimbursements are processed within 2 weeks\n\n**Eligible expenses include:** Planet Fitness, CrossFit, Peloton, Calm, Headspace, yoga classes, fitness equipment, and more.\n\n⚠️ Deadline: December 31 — don't leave this on the table!`;
  }

  if (msg.includes('401k') || msg.includes('retirement') || msg.includes('match') || msg.includes('fidelity') || msg.includes('contribution')) {
    return `💰 **401k Employer Match** — You're leaving money on the table!\n\nYou're currently using only 50% of TechCorp's match. Here's what you need to know:\n\n- TechCorp matches **100% of your contributions up to 4% of salary**\n- At $80k salary, that's **$3,200/year in free money**\n- You're currently only getting ~$1,600\n\n**How to maximize:**\n1. Log into **Fidelity NetBenefits** at netbenefits.com\n2. Click "Contribution Amount"\n3. Set your contribution to **at least 4%**\n4. Changes take effect the next pay period\n\n📈 Pro tip: If you can, go beyond 4% — you can contribute up to $23,000/year (2024 IRS limit) for additional tax savings!`;
  }

  if (msg.includes('fsa') || msg.includes('flexible spending') || msg.includes('health savings')) {
    return `🏥 **FSA vs HSA — Know the Difference**\n\n**Your Health FSA:** $2,400 annual value, only 20% used — you have **$1,920 remaining**\n⚠️ FSA is **USE IT OR LOSE IT** — expires December 31!\n\n**Your HSA:** $1,200 employer contribution, 30% used — **$840 remaining**\n✅ HSA funds **roll over forever** and can be invested!\n\n**Quick FSA wins before year-end:**\n- Stock up on FSA-eligible OTC medications\n- Schedule dental/vision appointments\n- Buy glasses, contacts, or sunscreen\n- Get a massage (with prescription)\n- Buy a first aid kit\n\n**How to use your FSA:**\n1. Use your FSA debit card directly at eligible providers\n2. Or submit receipts at **wageworks.com**\n\nDon't lose that $1,920! What expenses do you have coming up?`;
  }

  if (msg.includes('hsa')) {
    return `💊 **Health Savings Account (HSA)** — Triple tax advantage!\n\nYour HSA status: $1,200 employer contribution, 30% used ($840 remaining)\n\n**The HSA Triple Tax Advantage:**\n1. Contributions are pre-tax\n2. Growth is tax-free\n3. Withdrawals for medical expenses are tax-free\n\n**Unlike FSA, HSA funds never expire** — you can invest them and use them in retirement!\n\n**How to access your funds:**\n1. Log into **HealthEquity** at healthequity.com\n2. Use your HSA debit card at eligible providers\n3. Or pay out of pocket and reimburse yourself later\n\n**Investment tip:** Once your HSA balance exceeds $1,000, you can invest the excess in mutual funds — treat it as a stealth retirement account!`;
  }

  if (msg.includes('learning') || msg.includes('course') || msg.includes('education') || msg.includes('tuition') || msg.includes('certification') || msg.includes('udemy') || msg.includes('coursera')) {
    return `📚 **Professional Development Stipend** — $2,000/year, only 15% used!\n\nYou have approximately **$1,700 remaining** to spend on your career.\n\n**What's covered:**\n- Online courses (Udemy, Coursera, Pluralsight, LinkedIn Learning)\n- Certifications (AWS, Google Cloud, PMP, etc.)\n- Technical books and resources\n- Industry conferences\n- Workshop and bootcamp fees\n\n**How to claim:**\n1. For purchases under $500: Buy it and submit receipts in Workday within 30 days\n2. For $500+: Submit an L&D Request for manager approval first\n3. Navigate to Workday → "Learning & Development" → "Expense Reimbursement"\n\n**Hot tip:** AWS certifications, Google Cloud certs, and conference tickets are all eligible. A single AWS cert exam costs $300 — your employer is paying for it!`;
  }

  if (msg.includes('dental')) {
    return `🦷 **Dental Insurance** — 80% used, ~$300 remaining!\n\nYou've done great with dental this year. Here's how to use your remaining $300:\n\n**Remaining coverage opportunities:**\n- Additional cleaning if you've only had one this year (most plans cover 2)\n- X-rays (if not done this year)\n- Fluoride treatment\n- Sealants\n\n**Your Delta Dental Coverage:**\n- Preventive (cleanings, exams): 100%\n- Basic (fillings): 80%\n- Major (crowns, root canals): 50%\n- Annual max: $1,500\n\n**Find a provider:** Visit **deltadentalins.com** → "Find a Dentist"\n\nSchedule before December 31 to use your remaining benefits!`;
  }

  if (msg.includes('vision') || msg.includes('glasses') || msg.includes('contacts') || msg.includes('eye')) {
    return `👁️ **Vision Insurance** — You've maximized this benefit!\n\nGreat job using your full VSP vision benefit this year.\n\n**Next year's benefits reset January 1:**\n- Annual eye exam: Covered 100% in-network\n- Frames: Up to $180 allowance\n- Lenses: Covered with copay\n- Contacts: Up to $180 allowance\n\n**Pro tip for next year:** VSP allows you to "stock up" on contacts if you choose contacts over glasses. Order a year's supply!\n\n**Find a VSP provider:** vsp.com → "Find an Eye Doctor"\n\nSet a calendar reminder for January to schedule your annual exam!`;
  }

  if (msg.includes('childcare') || msg.includes('dependent care') || msg.includes('daycare') || msg.includes('kids') || msg.includes('children')) {
    return `👶 **Dependent Care FSA** — Up to $5,000 in pre-tax savings!\n\nThis benefit could save you **~$1,500 in federal taxes** if you have qualifying dependents.\n\n**Eligible expenses:**\n- Daycare and preschool\n- After-school programs\n- Summer day camps\n- Elder care for a dependent parent\n- Au pair or nanny services\n\n**How it works:**\n1. You contribute pre-tax dollars (up to $5,000/year)\n2. Pay for eligible care\n3. Submit receipts for reimbursement\n\n**Important:** Open enrollment is November 1-30 for next year. If you have kids in daycare, this is one of the highest-value benefits you can enroll in!\n\nAre you currently paying for childcare?`;
  }

  if (msg.includes('legal') || msg.includes('lawyer') || msg.includes('attorney') || msg.includes('will') || msg.includes('contract')) {
    return `⚖️ **Legal Services Benefit** — $500/year, completely unused!\n\n**LegalShield covers:**\n- Will and estate planning (normally $300-500 with an attorney)\n- Contract review (leases, purchase agreements)\n- Legal consultations on any matter\n- Traffic tickets and minor legal issues\n- Family law questions\n\n**How to access:**\n1. Visit **legalshield.com/hub/techcorp**\n2. Or call the 24/7 legal advice line: 1-800-555-LEGAL\n3. Reference your employee ID for access\n\n**Best use cases:**\n- Get a will drafted — a basic will costs $300+ without this benefit\n- Review your apartment lease before signing\n- Understand your rights in any situation\n\nHave you considered getting a will? It's the most commonly underused legal benefit!`;
  }

  if (msg.includes('remote') || msg.includes('home office') || msg.includes('work from home') || msg.includes('stipend') || msg.includes('internet') || msg.includes('monitor')) {
    return `🏠 **Remote Work Stipend** — $1,200/year, 0% used!\n\nYou have the full **$1,200 available** ($100/month) for home office expenses.\n\n**What's covered:**\n- Internet service (monthly bill reimbursement)\n- Home office equipment (monitors, keyboards, webcams, headsets)\n- Office furniture (chair, desk, lamp)\n- Phone bill (partial reimbursement)\n- Co-working space memberships\n\n**How to claim:**\n1. Workday → Expenses → "Remote Work Reimbursement"\n2. Upload receipts (within 60 days)\n3. For recurring bills (internet), set up monthly submission\n\n**Quick wins:**\n- Submit your last 3 months of internet bills (~$150-300)\n- That ergonomic chair you've been eyeing? Submit it!\n- New monitor, keyboard, or headset all qualify\n\nWhat home office needs do you have?`;
  }

  if (msg.includes('espp') || msg.includes('stock') || msg.includes('purchase plan') || msg.includes('shares')) {
    return `💹 **Employee Stock Purchase Plan (ESPP)** — 15% instant return!\n\nThe ESPP is one of the most underutilized financial benefits. Here's why it's amazing:\n\n**The math:**\n- You buy TechCorp stock at a **15% discount**\n- If stock is at $100, you pay $85\n- Sell immediately for a **guaranteed 17.6% return**\n- Annual limit: $25,000 in purchases\n\n**How to enroll:**\n1. Log into **Fidelity NetBenefits**\n2. Click "ESPP" → "Enroll"\n3. Set your payroll deduction (1-15% of salary)\n4. **Next enrollment window: January 1 - February 15**\n\n**Tax considerations:**\nESPP gains are taxable, but the discount is always worth it. Consult a tax advisor about holding periods vs. qualifying dispositions.\n\nSet a reminder to enroll in January!`;
  }

  if (msg.includes('commuter') || msg.includes('transit') || msg.includes('bus') || msg.includes('train') || msg.includes('parking') || msg.includes('subway')) {
    return `🚌 **Commuter Benefits** — Save $900/year in taxes!\n\nUp to **$300/month** in pre-tax commuter benefits — that's $3,600/year on transit and parking.\n\n**Tax savings breakdown:**\n- $3,600 pre-tax contribution\n- ~25% tax rate\n- **$900 saved in federal taxes**\n\n**What's covered:**\n- Monthly transit passes (subway, bus, train)\n- Vanpool expenses\n- Work-related parking\n\n**How to enroll:**\n1. Visit **wageworks.com**\n2. Select "Commuter" → "Order Transit Passes"\n3. You can change elections monthly!\n\n**Important:** Even if you work from home most days, you can still use this for the days you commute. Every bit saves on taxes!\n\nDo you currently pay for any commuting costs?`;
  }

  if (msg.includes('pet') || msg.includes('dog') || msg.includes('cat') || msg.includes('animal')) {
    return `🐾 **Pet Insurance** — Group rates, significant savings!\n\nTechCorp offers voluntary pet insurance through Nationwide at group rates.\n\n**Coverage options:**\n- Accident & Illness (most popular)\n- Wellness add-on (routine care)\n- Average savings vs individual policy: ~$400/year\n\n**What's covered:**\n- Emergency vet visits\n- Surgery and hospitalization\n- Prescription medications\n- Hereditary conditions\n- Cancer treatment\n\n**How to enroll:**\n1. Visit **petinsurance.com**\n2. Use group code: **TECHCORP2024**\n3. **Enrollment period: November 1 - November 30**\n\n**Is it worth it?** The average unexpected vet bill is $1,000-$3,000. Pet insurance typically costs $30-60/month — it pays for itself after one emergency.\n\nDo you have pets?`;
  }

  if (msg.includes('mental health') || msg.includes('counseling') || msg.includes('therapy') || msg.includes('eap') || msg.includes('stress') || msg.includes('anxiety')) {
    return `🧠 **Mental Health & EAP** — Free, confidential support\n\nThe Employee Assistance Program (EAP) offers completely **FREE and confidential** mental health support.\n\n**What's included (no cost to you):**\n- Unlimited counseling sessions\n- Therapist matching and referrals\n- Financial counseling\n- Work-life balance coaching\n- 24/7 crisis support line\n\n**Confidentiality guarantee:**\n- Your employer cannot see if you use EAP\n- Does not appear on your health insurance record\n- Completely anonymous\n\n**How to access:**\n- Call: **1-800-327-2251** (24/7)\n- Online: Visit the EAP portal from your benefits page\n- App: Download the EAP app for on-demand resources\n\nTaking care of your mental health is just as important as physical health. These sessions are completely free — there's no reason not to use them if you need support.`;
  }

  if (msg.includes('what am i missing') || msg.includes('missing') || msg.includes('unclaimed') || msg.includes('unused')) {
    return `🔍 **Your Top Unclaimed Benefits** — You have **$22,460 in unused benefits!**\n\nHere are your highest-value opportunities:\n\n1. **💹 ESPP** — $5,000 potential value (0% used)\n   Enrollment opens January 1. 15% instant return on investment.\n\n2. **👶 Dependent Care FSA** — $5,000 in pre-tax savings (0% used)\n   Could save ~$1,500 in taxes. Enrollment: Nov 1-30.\n\n3. **🚌 Commuter Benefits** — $3,600/year (0% used)\n   Pre-tax transit/parking. Enroll anytime, change monthly.\n\n4. **💰 401k Match** — $1,600 uncaptured match (50% used)\n   Increase contribution to 4% to get full employer match.\n\n5. **🏠 Remote Work Stipend** — $1,200 available (0% used)\n   Submit past internet bills and office equipment receipts!\n\n**Quickest wins (act this week):**\n- Submit home office receipts → $1,200\n- Increase 401k contribution → $1,600/year\n- Use FSA before Dec 31 → $1,920 expiring!\n\nWould you like details on any of these?`;
  }

  if (msg.includes('maximize') || msg.includes('how do i') || msg.includes('help') || msg.includes('start') || msg.includes('hello') || msg.includes('hi')) {
    return `👋 **Hi Alex! I'm your Benefits AI Assistant.**\n\nI've analyzed your benefits package and found some great opportunities:\n\n**⚠️ Urgent (expires Dec 31):**\n- Health FSA: $1,920 remaining — use it or lose it!\n- Gym Reimbursement: $600 unclaimed\n- Professional Development: $1,700 remaining\n\n**💰 High Value:**\n- ESPP: Enroll in January for 15% instant returns\n- 401k: Increase to 4% to capture full $3,200 employer match\n\n**Quick actions I can help with:**\n- "How do I claim my gym reimbursement?"\n- "Explain my FSA vs HSA"\n- "How do I maximize my 401k?"\n- "What remote work expenses can I claim?"\n\nWhat would you like to explore first?`;
  }

  return `💡 **Here are your top 3 unused benefits right now:**\n\n1. **💪 Gym & Wellness** — $600 available, $0 used\n   Quick win: Submit your gym membership receipts this week!\n\n2. **🏠 Remote Work Stipend** — $1,200 available, $0 used\n   Submit internet bills + home office equipment receipts in Workday.\n\n3. **📚 Professional Development** — $1,700 remaining\n   Enroll in an online course on Udemy or Coursera today.\n\n**Total you could claim this week: $3,500+**\n\nI can help you with any specific benefit. Try asking:\n- "How do I claim gym reimbursement?"\n- "Explain my FSA deadline"\n- "How do I maximize my 401k match?"\n- "What am I missing?"`;
}

router.post('/', (req: Request, res: Response) => {
  const { message } = req.body as ChatRequest;
  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message is required' });
    return;
  }
  const response = getResponse(message);
  res.json({ response });
});

export default router;
