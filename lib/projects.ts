export type Project = {
  slug: string; name: string; category: string; kind: 'systems' | 'websites';
  headline: string; summary: string; role: string; market: string; status: string;
  tags: string[]; url?: string; image?: string; theme: string;
  overview: string; challenge: string; contribution: string[];
  solution: {title:string; text:string}[]; workflow: string[];
  tech: {label:string; value:string}[]; decisions: {title:string;text:string}[];
  outcome: string; interfaceNote: string;
};
export const projects: Project[] = [
 {
  slug:'basgel-master',name:'Bagel Master',category:'Customer experience · UK delivery',kind:'websites',
  headline:'A London favourite. A considered digital experience.',
  summary:'Bringing a London food business online with an inviting brand experience and a clear path from discovery to the menu.',
  role:'Design, frontend engineering & production delivery',market:'London, United Kingdom',status:'Delivered · Live website',
  tags:['Customer experience','Responsive design','Production delivery'],url:'https://bagelmaster.co.uk/',image:'bagel-master',theme:'bagel',
  overview:'Bagel Master is a London business serving artisan bagels and coffee. The delivered website brings its food, brand story and menu together in a customer-facing experience built for everyday use.',
  challenge:'A food business needs more than an attractive homepage. Customers need to understand what is available, find the menu quickly and move comfortably between browsing and ordering on their phone.',
  contribution:['Shaped the customer-facing visual experience around the food and the business.','Built responsive pages for the homepage, menu, story, events and gallery.','Connected the frontend to menu and customer-order services.','Delivered the website to production on the business’s UK domain.'],
  solution:[{title:'A clear first impression',text:'Food-led imagery, warm colour and direct menu calls to action introduce the business immediately.'},{title:'A menu built for browsing',text:'Categories organise bagels, wraps, sides and drinks, with product details accessible from the menu experience.'},{title:'A connected customer journey',text:'The source separates menu, cart, customer account and order-detail concerns, allowing the experience to extend beyond a brochure.'}],
  workflow:['Discover the business','Browse menu categories','Explore a product','Continue to cart'],
  tech:[{label:'Frontend',value:'React · Vite · React Router'},{label:'Interface',value:'Tailwind CSS · Framer Motion'},{label:'Supporting backend',value:'Node.js · Express · PostgreSQL'},{label:'Integrations in source',value:'Stripe · WebSockets'},{label:'Delivery',value:'Live custom-domain website'}],
  decisions:[{title:'Make browsing feel natural on a phone',text:'The menu groups products by category, while a compact mobile navigation keeps the main customer routes accessible.'},{title:'Keep the interface connected to the business',text:'Dedicated service modules handle menus, orders and customer profiles. This separates presentation from the data the business maintains.'}],
  outcome:'A delivered UK business website with responsive customer-facing pages, a category-based menu and a connected ordering interface. The live site is the evidence of delivery; no sales or conversion uplift is claimed.',
  interfaceNote:'Screens captured from the live public website. The welcome offer was dismissed for a clear view.'
 },
 {
  slug:'blr-hub',name:'BLR Hub',category:'Multi-tenant operations platform',kind:'systems',
  headline:'One place to run the moving parts of a business.',
  summary:'Centralised administration for institutions, properties, tenants and inventory, with operational workflows and permission-aware access.',
  role:'Full-stack product development',market:'Business operations',status:'Application · Authenticated access',
  tags:['Multi-institution','Roles & permissions','Operational workflows'],theme:'blr',
  overview:'BLR Hub is a multi-tenant operations management platform. Its scope brings institution administration, property operations, residents and inventory into a connected system rather than treating each as an isolated spreadsheet.',
  challenge:'Organisations managing several institutions and properties need a consistent view of the work. Separate records make it difficult to know which institution a record belongs to, what action is due and who should be able to change it.',
  contribution:['Developed connected administration workflows across the platform.','Worked on institution, property and tenant management.','Built permission-aware navigation and operational interfaces.','Connected React interfaces to backend services and relational data.'],
  solution:[{title:'Central administration',text:'Institution records provide the context for operational activity across multiple sites.'},{title:'Property and tenant lifecycles',text:'The inspected source includes buildings, floors, rooms and beds, alongside tenant assignment, transfers, vacancy and payment records.'},{title:'Access that follows responsibility',text:'Menu and action permissions shape available routes and controls. Different responsibilities can be represented without giving every user the same interface.'}],
  workflow:['Choose an institution','Manage properties & inventory','Assign tenants & responsibilities','Review activity & reports'],
  tech:[{label:'Frontend',value:'React · Redux Toolkit · Vite'},{label:'Backend',value:'Node.js · Express'},{label:'Data',value:'PostgreSQL'},{label:'Interface systems',value:'Recharts · Tailwind CSS'},{label:'Access & updates',value:'JWT · Menu/action permissions · Socket.IO'}],
  decisions:[{title:'Keep institutional context visible',text:'Institution-specific routes and administration flows give operational records a clear place in the product. This is a multi-institution workflow description, not a claim of independently audited data isolation.'},{title:'Model a lifecycle, not just a table',text:'Active and vacated tenants, transfers, vacant beds and activity history are separate concepts in the inspected source. These states support the work that happens after a record is created.'},{title:'Represent permissions at the action level',text:'The permissions utilities distinguish route access from actions. This supports interfaces that reflect a user’s responsibility instead of relying only on a single administrator flag.'}],
  outcome:'A connected business platform covering institutional and property operations, tenant lifecycles and administrative permissions. This case study presents the system’s scope without publishing operational records.',
  interfaceNote:'Illustrative interface using fictional sample records. The production dashboard requires authentication. Workflow and technical details are grounded in the supplied brief and inspected Management repository.'
 },
 {
  slug:'Payment',name:'Payment',category:'Payment operations software',kind:'systems',
  headline:'Making complex payment operations easier to navigate.',
  summary:'Operational software for account administration, merchant records and transaction-related workflows.',
  role:'Business application & backend development',market:'Payments & administration',status:'Application · Private operational data',
  tags:['Merchant administration','Account workflows','Reporting'],theme:'Payment',
  overview:'Payment is payment-related business software with an administrative control centre. It represents work on the operational side of a financial application, where account records and transaction workflows need structure and care.',
  challenge:'Payment operations involve different kinds of accounts, merchants, terminals and transaction records. Operators need clear workflows, while private customer and financial information must remain protected.',
  contribution:['Worked on the business application and its administrative workflows.','Developed backend modules supporting account and merchant operations.','Worked with transaction-related routes and reporting modules.','Connected business records through structured service and data-access code.'],
  solution:[{title:'Merchant operations',text:'The inspected code distinguishes individual and corporate merchants and includes merchant group and type modules.'},{title:'Account and terminal administration',text:'Dedicated modules represent terminal users, account-related records, status changes and operational limits.'},{title:'Transaction and reporting workflows',text:'Transaction, top-up and reporting modules support the operational record of payment-related activity.'}],
  workflow:['Review an account','Inspect merchant context','Follow operational activity','Review reporting'],
  tech:[{label:'Backend',value:'Node.js · Express'},{label:'Data libraries in source',value:'PostgreSQL (pg) · MySQL (mysql2)'},{label:'Authentication library',value:'JSON Web Tokens'},{label:'Reporting libraries',value:'ExcelJS · jsPDF · CSV tooling'},{label:'Communication library',value:'WebSockets'}],
  decisions:[{title:'Separate distinct business entities',text:'Individual and corporate merchant models are handled separately, with common merchant lookup logic. That reflects different account needs while supporting a consistent operational entry point.'},{title:'Keep private operations private',text:'This presentation uses a simplified illustrative view. No customer identities, transaction amounts, credentials or account details are taken from the production system.'}],
  outcome:'Business application work spanning account administration, merchants and transaction-related operations. The case study demonstrates engineering scope without implying a security certification or a measured financial outcome.',
  interfaceNote:'Illustrative workflow presentation with fictional records. It is not a screenshot of the private Payment dashboard. Technical details are verified from local backend source; the frontend stack is not asserted.'
 },
 {
  slug:'oceanmax',name:'OceanMax',category:'Corporate website · Logistics',kind:'websites',
  headline:'A global business, presented with clarity.',
  summary:'A confident corporate web presence that brings freight services and customer enquiries into a coherent experience.',
  role:'Visual design & frontend engineering',market:'Logistics & international business',status:'Deployed website',
  tags:['Corporate presence','Service architecture','Responsive frontend'],url:'https://oceanmax.netlify.app/',image:'oceanmax',theme:'ocean',
  overview:'OceanMax is a corporate website for a logistics business. The public deployment presents freight and supply-chain services, company information and a route to request a quote.',
  challenge:'A logistics offering can become a dense list of services. The website needs to organise that breadth into clear choices while giving international business visitors a confident first impression.',
  contribution:['Created the visual direction and responsive frontend.','Organised the company and service content into a navigable structure.','Designed clear quote and enquiry entry points.','Delivered a deployed web experience.'],
  solution:[{title:'A focused corporate presence',text:'Large-scale imagery and restrained layouts place the business and its services at the centre.'},{title:'A structured service offering',text:'Service navigation gives visitors a way to explore the logistics offering without reading a single long undifferentiated page.'},{title:'A next step for interested customers',text:'Quote and contact entry points connect service discovery to an enquiry.'}],
  workflow:['Understand the business','Explore a service','Review company context','Request a quote'],
  tech:[{label:'Frontend',value:'React · TypeScript · Vite'},{label:'Visual system',value:'Tailwind CSS · Framer Motion'},{label:'Content',value:'Structured service and navigation data'},{label:'Deployment',value:'Netlify'}],
  decisions:[{title:'Give content a reusable structure',text:'Separate data files for services, navigation, industries and insights keep the content organised and make related pages easier to maintain.'},{title:'Let hierarchy carry the breadth',text:'The interface combines a clear opening message with service-level navigation, giving the corporate story and individual offerings distinct jobs.'}],
  outcome:'A deployed corporate frontend with service discovery, company presentation and enquiry entry points. Presented as design and frontend work, without adopting unverified client logos or business claims from the source website.',
  interfaceNote:'Screens captured from the public deployment. The portfolio does not claim the source website’s partner names as clients of this studio.'
 },
 {
  slug:'buildmore',name:'Buildmore',category:'Education · Product website',kind:'websites',
  headline:'A hands-on idea, brought to life on the web.',
  summary:'A distinctive learning brand experience that helps prospective students understand the offer and find their next step.',
  role:'Product design & frontend development',market:'Education',status:'Deployed website',
  tags:['Visual identity','Interactive frontend','Enquiry journey'],url:'https://buildmoree.netlify.app/',image:'buildmore',theme:'buildmore',
  overview:'Buildmore presents live, project-based coding education. Its public website introduces the teaching approach, programs, projects and assessment or workshop entry points.',
  challenge:'Prospective learners need to understand what makes the offer different and what they will actually do. The interface needs to explain the learning model while making the next action easy to find.',
  contribution:['Designed the visual system and responsive page structure.','Built the React and TypeScript frontend.','Created program, approach and project presentation sections.','Shaped assessment and workshop enquiry entry points.'],
  solution:[{title:'An idea you can recognise',text:'A bold typographic system and restrained green accents make the hands-on learning proposition immediately visible.'},{title:'A tangible product story',text:'The code-and-preview motif connects the learning message to the experience of building something.'},{title:'A clear path to participation',text:'Program and approach content support the assessment and workshop calls to action.'}],
  workflow:['Explore the approach','Find a program','See what learners build','Enquire about a session'],
  tech:[{label:'Frontend',value:'React · TypeScript · Vite'},{label:'Interface',value:'Tailwind CSS · Lucide'},{label:'Supporting application',value:'Separate admin frontend and backend in local source'},{label:'Deployment',value:'Netlify'}],
  decisions:[{title:'Explain the approach visually',text:'The page uses a code-to-preview composition to make the project-based teaching model tangible, rather than relying entirely on long explanatory copy.'},{title:'Keep content and action connected',text:'Programs, approach and projects lead toward an assessment or workshop enquiry, giving different visitors relevant routes through the offer.'}],
  outcome:'A deployed, responsive education website with a distinctive visual system and a coherent enquiry journey. This case study makes no claim about student enrolments or conversion rates.',
  interfaceNote:'Screens captured from the live public website; frontend technologies verified against the local project.'
 },
 {
  slug:'madhurawada-home-kitchen',name:'Madhurawada Home Kitchen',category:'Food commerce · Customer experience',kind:'websites',
  headline:'A local kitchen with a direct digital storefront.',
  summary:'A warm, menu-led commerce experience connecting a neighbourhood food business with its customers.',
  role:'Customer experience & web development',market:'Local food commerce',status:'Deployed website',
  tags:['Menu discovery','Customer journeys','Mobile experience'],url:'https://madhurawadahomekitchen.netlify.app/',image:'home-kitchen',theme:'kitchen',
  overview:'Madhurawada Home Kitchen is a customer-facing website for homestyle Andhra food. The public interface brings together the menu, offers, business story, ordering entry points and customer account access.',
  challenge:'Customers need to understand the food, location and ordering options quickly. A small business also needs room to tell its story without placing that story between a hungry customer and the menu.',
  contribution:['Created the customer-facing web experience.','Built responsive menu, offer and business-story sections.','Designed ordering and customer interaction entry points.','Connected the presentation around the kitchen’s local service context.'],
  solution:[{title:'Food first',text:'Large food imagery and a clear introduction establish the cuisine and service area.'},{title:'A useful menu experience',text:'Menu and offer sections put product discovery at the centre of the page.'},{title:'Customer interaction',text:'Direct-order, WhatsApp and account entry points give the customer visible ways to continue.'}],
  workflow:['Discover the kitchen','Explore the daily menu','Choose an ordering route','Continue the customer journey'],
  tech:[{label:'Framework',value:'Next.js · React · TypeScript'},{label:'Interface',value:'Tailwind CSS · Lucide'},{label:'Source structure',value:'Customer app with a separate backend directory'},{label:'Deployment',value:'Netlify'}],
  decisions:[{title:'Balance story and utility',text:'The first screen establishes the kitchen’s identity while preserving direct access to the menu and ordering options.'},{title:'Design around local context',text:'Service-area and meal-time information sit alongside the food experience, helping customers decide whether the offering fits their needs.'}],
  outcome:'A deployed customer-facing food website with menu discovery, business storytelling and clear interaction routes. The public interface was reviewed; no live order or payment was submitted.',
  interfaceNote:'Screens captured from the live public website. Technology details verified against the local cloud-kitchen source.'
 }
];
export const getProject = (slug:string) => projects.find(project => project.slug === slug);
