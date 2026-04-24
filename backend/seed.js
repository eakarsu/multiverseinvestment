const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  database: process.env.DB_NAME || 'multiverse_consulting',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

async function seed() {
  const client = await pool.connect();

  try {
    console.log('Dropping existing tables...');
    await client.query(`
      DROP TABLE IF EXISTS payments CASCADE;
      DROP TABLE IF EXISTS meetings CASCADE;
      DROP TABLE IF EXISTS partners CASCADE;
      DROP TABLE IF EXISTS candidates CASCADE;
      DROP TABLE IF EXISTS orders CASCADE;
      DROP TABLE IF EXISTS companies CASCADE;
      DROP TABLE IF EXISTS insights CASCADE;
      DROP TABLE IF EXISTS case_studies CASCADE;
      DROP TABLE IF EXISTS executive_search CASCADE;
      DROP TABLE IF EXISTS invoices CASCADE;
      DROP TABLE IF EXISTS pipeline CASCADE;
      DROP TABLE IF EXISTS services CASCADE;
      DROP TABLE IF EXISTS kpis CASCADE;
      DROP TABLE IF EXISTS revenue CASCADE;
      DROP TABLE IF EXISTS contacts CASCADE;
      DROP TABLE IF EXISTS proposals CASCADE;
      DROP TABLE IF EXISTS tasks CASCADE;
      DROP TABLE IF EXISTS strategies CASCADE;
      DROP TABLE IF EXISTS investments CASCADE;
      DROP TABLE IF EXISTS talent CASCADE;
      DROP TABLE IF EXISTS projects CASCADE;
      DROP TABLE IF EXISTS clients CASCADE;
    `);
    console.log('Tables dropped.');

    // Create tables
    console.log('Creating tables...');

    await client.query(`
      CREATE TABLE clients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        industry VARCHAR(255),
        contact_email VARCHAR(255),
        phone VARCHAR(100),
        status VARCHAR(50) DEFAULT 'active',
        revenue DECIMAL(15,2),
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - clients table created');

    await client.query(`
      CREATE TABLE projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        client_name VARCHAR(255),
        status VARCHAR(50) DEFAULT 'planning',
        budget DECIMAL(15,2),
        start_date DATE,
        end_date DATE,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - projects table created');

    await client.query(`
      CREATE TABLE talent (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        role VARCHAR(255),
        skills TEXT,
        experience_years INTEGER,
        hourly_rate DECIMAL(10,2),
        status VARCHAR(50) DEFAULT 'available',
        bio TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - talent table created');

    await client.query(`
      CREATE TABLE investments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        type VARCHAR(100),
        amount DECIMAL(15,2),
        target_return DECIMAL(5,2),
        risk_level VARCHAR(50),
        status VARCHAR(50) DEFAULT 'evaluating',
        sector VARCHAR(255),
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - investments table created');

    await client.query(`
      CREATE TABLE strategies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        client_name VARCHAR(255),
        objective TEXT,
        approach TEXT,
        timeline VARCHAR(255),
        status VARCHAR(50) DEFAULT 'draft',
        kpi_targets TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - strategies table created');

    await client.query(`
      CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        project_name VARCHAR(255),
        assigned_to VARCHAR(255),
        priority VARCHAR(50) DEFAULT 'medium',
        status VARCHAR(50) DEFAULT 'pending',
        due_date DATE,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - tasks table created');

    await client.query(`
      CREATE TABLE proposals (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        client_name VARCHAR(255),
        value DECIMAL(15,2),
        status VARCHAR(50) DEFAULT 'draft',
        submitted_date DATE,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - proposals table created');

    await client.query(`
      CREATE TABLE contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(100),
        company VARCHAR(255),
        role VARCHAR(255),
        relationship VARCHAR(100) DEFAULT 'prospect',
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - contacts table created');

    await client.query(`
      CREATE TABLE revenue (
        id SERIAL PRIMARY KEY,
        source VARCHAR(255),
        client_name VARCHAR(255),
        amount DECIMAL(15,2),
        type VARCHAR(100),
        date DATE,
        quarter VARCHAR(10),
        status VARCHAR(50) DEFAULT 'received',
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - revenue table created');

    await client.query(`
      CREATE TABLE kpis (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        category VARCHAR(255),
        value DECIMAL(15,2),
        target DECIMAL(15,2),
        unit VARCHAR(50),
        trend VARCHAR(50),
        period VARCHAR(100),
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - kpis table created');

    await client.query(`
      CREATE TABLE services (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        category VARCHAR(100),
        description TEXT,
        deliverables TEXT,
        duration VARCHAR(100),
        price_min DECIMAL(15,2),
        price_max DECIMAL(15,2),
        pricing_model VARCHAR(100),
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - services table created');

    await client.query(`
      CREATE TABLE pipeline (
        id SERIAL PRIMARY KEY,
        deal_name VARCHAR(255),
        client_name VARCHAR(255),
        contact_email VARCHAR(255),
        stage VARCHAR(50) DEFAULT 'inquiry',
        value DECIMAL(15,2),
        service_type VARCHAR(255),
        source VARCHAR(100),
        region VARCHAR(100),
        probability INTEGER DEFAULT 20,
        expected_close DATE,
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - pipeline table created');

    await client.query(`
      CREATE TABLE invoices (
        id SERIAL PRIMARY KEY,
        invoice_number VARCHAR(50),
        client_name VARCHAR(255),
        project_name VARCHAR(255),
        amount DECIMAL(15,2),
        payment_terms VARCHAR(100),
        status VARCHAR(50) DEFAULT 'draft',
        issue_date DATE,
        due_date DATE,
        paid_date DATE,
        payment_method VARCHAR(100),
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - invoices table created');

    await client.query(`
      CREATE TABLE executive_search (
        id SERIAL PRIMARY KEY,
        position_title VARCHAR(255),
        client_name VARCHAR(255),
        role_level VARCHAR(100),
        department VARCHAR(255),
        compensation_min DECIMAL(15,2),
        compensation_max DECIMAL(15,2),
        required_skills TEXT,
        location VARCHAR(255),
        status VARCHAR(50) DEFAULT 'open',
        candidates_sourced INTEGER DEFAULT 0,
        source_channels TEXT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - executive_search table created');

    await client.query(`
      CREATE TABLE case_studies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        client_name VARCHAR(255),
        industry VARCHAR(255),
        region VARCHAR(100),
        challenge TEXT,
        solution TEXT,
        results TEXT,
        services_used TEXT,
        duration VARCHAR(100),
        value_delivered VARCHAR(255),
        status VARCHAR(50) DEFAULT 'draft',
        published_date DATE,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - case_studies table created');

    await client.query(`
      CREATE TABLE insights (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        category VARCHAR(100),
        author VARCHAR(255),
        summary TEXT,
        content TEXT,
        tags TEXT,
        industry VARCHAR(255),
        region VARCHAR(100),
        status VARCHAR(50) DEFAULT 'draft',
        published_date DATE,
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - insights table created');

    await client.query(`
      CREATE TABLE companies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        industry VARCHAR(255),
        size VARCHAR(100),
        website VARCHAR(255),
        headquarters VARCHAR(255),
        revenue DECIMAL(15,2),
        relationship VARCHAR(100),
        contact_person VARCHAR(255),
        phone VARCHAR(50),
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - companies table created');

    await client.query(`
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(100),
        client_name VARCHAR(255),
        service VARCHAR(255),
        amount DECIMAL(15,2),
        status VARCHAR(50) DEFAULT 'pending',
        order_date DATE,
        delivery_date DATE,
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - orders table created');

    await client.query(`
      CREATE TABLE candidates (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        role_applied VARCHAR(255),
        experience_years INTEGER,
        skills TEXT,
        current_company VARCHAR(255),
        expected_salary DECIMAL(15,2),
        industry VARCHAR(255),
        region VARCHAR(100),
        role_level VARCHAR(100),
        linkedin VARCHAR(255),
        availability VARCHAR(50),
        resume_url TEXT,
        status VARCHAR(50) DEFAULT 'applied',
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - candidates table created');

    await client.query(`
      CREATE TABLE partners (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        type VARCHAR(100),
        contact_person VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        region VARCHAR(100),
        status VARCHAR(50) DEFAULT 'active',
        partnership_value DECIMAL(15,2),
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - partners table created');

    await client.query(`
      CREATE TABLE meetings (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        attendees TEXT,
        meeting_date DATE,
        meeting_time VARCHAR(20),
        location VARCHAR(255),
        type VARCHAR(100),
        status VARCHAR(50) DEFAULT 'scheduled',
        agenda TEXT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - meetings table created');

    await client.query(`
      CREATE TABLE payments (
        id SERIAL PRIMARY KEY,
        amount DECIMAL(15,2),
        currency VARCHAR(10) DEFAULT 'USD',
        service VARCHAR(255),
        client_name VARCHAR(255),
        invoice_number VARCHAR(100),
        payment_method VARCHAR(100),
        status VARCHAR(50) DEFAULT 'pending',
        receipt_url TEXT,
        payment_date DATE,
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  - payments table created');

    console.log('All tables created.');

    // Seed data
    console.log('Seeding data...');

    // Clients (15)
    await client.query(`
      INSERT INTO clients (name, industry, contact_email, phone, status, revenue, notes) VALUES
      ('Apex Financial Group', 'Financial Services', 'cfo@apexfinancial.com', '+1-212-555-0101', 'active', 2500000.00, 'Major institutional client, quarterly strategy reviews'),
      ('TechNova Solutions', 'Technology', 'ceo@technova.io', '+1-415-555-0102', 'active', 1800000.00, 'Series C startup, rapid scaling phase'),
      ('Meridian Healthcare', 'Healthcare', 'ops@meridianhc.com', '+1-617-555-0103', 'active', 3200000.00, 'Hospital network with 12 facilities'),
      ('Evergreen Manufacturing', 'Manufacturing', 'vp@evergreenmfg.com', '+1-312-555-0104', 'active', 1500000.00, 'Legacy manufacturer transitioning to Industry 4.0'),
      ('Pacific Retail Holdings', 'Retail', 'strategy@pacificretail.com', '+1-310-555-0105', 'active', 2100000.00, 'Multi-brand retail portfolio, 200+ locations'),
      ('Quantum Energy Corp', 'Energy', 'director@quantumenergy.com', '+1-713-555-0106', 'active', 4500000.00, 'Renewable energy transition engagement'),
      ('Atlas Logistics International', 'Logistics', 'coo@atlaslogistics.com', '+1-904-555-0107', 'active', 1200000.00, 'Global supply chain optimization project'),
      ('Pinnacle Education Group', 'Education', 'president@pinnacleedu.org', '+1-202-555-0108', 'prospect', 0.00, 'Exploring digital transformation of curriculum delivery'),
      ('Silverline Insurance', 'Insurance', 'svp@silverlineins.com', '+1-860-555-0109', 'active', 1900000.00, 'Claims process automation initiative'),
      ('Vanguard Properties', 'Real Estate', 'managing@vanguardprop.com', '+1-305-555-0110', 'active', 2800000.00, 'Commercial portfolio optimization across 5 markets'),
      ('NexGen Pharmaceuticals', 'Pharmaceuticals', 'bd@nexgenpharma.com', '+1-609-555-0111', 'active', 5100000.00, 'Market entry strategy for 3 new drug portfolios'),
      ('Horizon Media Group', 'Media & Entertainment', 'evp@horizonmedia.com', '+1-323-555-0112', 'inactive', 800000.00, 'Engagement paused, renewal discussions Q2'),
      ('Summit Aerospace', 'Aerospace & Defense', 'contracts@summitaero.com', '+1-206-555-0113', 'active', 3700000.00, 'Defense contract bid strategy and operations'),
      ('Coastal Hospitality Inc', 'Hospitality', 'gm@coastalhospitality.com', '+1-843-555-0114', 'prospect', 0.00, 'Initial discovery phase for resort expansion'),
      ('BlueBridge Consulting Partners', 'Professional Services', 'mp@bluebridgepartners.com', '+1-646-555-0115', 'active', 950000.00, 'Alliance partner for joint venture projects');
    `);
    console.log('  - 15 clients seeded');

    // Projects (15)
    await client.query(`
      INSERT INTO projects (name, client_name, status, budget, start_date, end_date, description) VALUES
      ('Digital Transformation Roadmap', 'Apex Financial Group', 'in_progress', 450000.00, '2025-09-01', '2026-03-31', 'Comprehensive digital transformation strategy including core banking modernization and customer experience redesign'),
      ('Market Expansion Strategy', 'TechNova Solutions', 'in_progress', 280000.00, '2025-10-15', '2026-04-15', 'Go-to-market strategy for expansion into European and Asian markets'),
      ('Operational Excellence Program', 'Meridian Healthcare', 'in_progress', 620000.00, '2025-07-01', '2026-06-30', 'End-to-end operational improvement across all 12 hospital facilities'),
      ('Industry 4.0 Migration', 'Evergreen Manufacturing', 'planning', 350000.00, '2026-01-15', '2026-09-30', 'Smart factory implementation with IoT sensors, predictive maintenance, and automated quality control'),
      ('Omnichannel Retail Strategy', 'Pacific Retail Holdings', 'in_progress', 520000.00, '2025-08-01', '2026-05-31', 'Unified commerce platform design and implementation across 200+ retail locations'),
      ('Renewable Energy Transition', 'Quantum Energy Corp', 'in_progress', 890000.00, '2025-06-01', '2026-12-31', 'Complete transition plan from fossil fuels to renewable energy portfolio'),
      ('Global Supply Chain Optimization', 'Atlas Logistics International', 'completed', 310000.00, '2025-03-01', '2025-12-31', 'Network redesign and optimization of global logistics operations'),
      ('Claims Automation Initiative', 'Silverline Insurance', 'in_progress', 475000.00, '2025-11-01', '2026-07-31', 'AI-driven claims processing automation reducing cycle time by 60%'),
      ('Portfolio Valuation & Strategy', 'Vanguard Properties', 'in_progress', 380000.00, '2025-10-01', '2026-04-30', 'Commercial real estate portfolio analysis and strategic repositioning'),
      ('Drug Launch Strategy', 'NexGen Pharmaceuticals', 'planning', 750000.00, '2026-02-01', '2026-11-30', 'Market entry strategy and launch plan for three new pharmaceutical products'),
      ('Defense Contract Optimization', 'Summit Aerospace', 'in_progress', 560000.00, '2025-09-15', '2026-06-15', 'Bid strategy and operations efficiency for major defense contracts'),
      ('Talent Acquisition Overhaul', 'Apex Financial Group', 'completed', 185000.00, '2025-04-01', '2025-10-31', 'Redesign of talent acquisition strategy and employer branding'),
      ('Cost Reduction Program', 'Meridian Healthcare', 'in_progress', 290000.00, '2025-12-01', '2026-05-31', 'Systematic cost reduction initiative targeting 15% operational savings'),
      ('Brand Repositioning', 'Pacific Retail Holdings', 'planning', 240000.00, '2026-03-01', '2026-08-31', 'Strategic brand repositioning for three flagship retail brands'),
      ('Joint Venture Framework', 'BlueBridge Consulting Partners', 'in_progress', 165000.00, '2025-11-15', '2026-03-31', 'Development of strategic alliance and joint venture operating framework');
    `);
    console.log('  - 15 projects seeded');

    // Talent (15)
    await client.query(`
      INSERT INTO talent (name, email, role, skills, experience_years, hourly_rate, status, bio) VALUES
      ('Dr. Sarah Chen', 'sarah.chen@multiverse.com', 'Senior Strategy Partner', 'Corporate Strategy, M&A Advisory, Market Analysis, Board Presentations', 18, 450.00, 'engaged', 'Former McKinsey partner with deep expertise in financial services transformation. PhD in Economics from MIT.'),
      ('James Morrison', 'james.morrison@multiverse.com', 'Principal Consultant', 'Operations, Lean Six Sigma, Supply Chain, Process Optimization', 14, 350.00, 'available', 'Operations excellence specialist with experience across manufacturing and logistics. Black Belt certified.'),
      ('Amara Okafor', 'amara.okafor@multiverse.com', 'Digital Strategy Lead', 'Digital Transformation, Cloud Architecture, AI/ML Strategy, Agile', 12, 380.00, 'engaged', 'Former Google strategist specializing in enterprise digital transformation and emerging technology adoption.'),
      ('Michael Reeves', 'michael.reeves@multiverse.com', 'Healthcare Practice Lead', 'Healthcare Operations, Regulatory Compliance, Clinical Workflow, Value-Based Care', 16, 420.00, 'engaged', 'MD-MBA with extensive experience in healthcare system optimization and regulatory navigation.'),
      ('Elena Vasquez', 'elena.vasquez@multiverse.com', 'Financial Advisory Director', 'Financial Modeling, Valuation, Risk Management, Capital Markets', 15, 400.00, 'available', 'CFA charterholder with Goldman Sachs background. Expert in complex financial structuring and risk analysis.'),
      ('David Park', 'david.park@multiverse.com', 'Technology Consultant', 'Enterprise Architecture, System Integration, Cloud Migration, DevOps', 10, 320.00, 'available', 'Full-stack technologist with hands-on experience in large-scale system migrations and cloud adoptions.'),
      ('Priya Sharma', 'priya.sharma@multiverse.com', 'Talent Strategy Director', 'Talent Management, Organizational Design, Change Management, Culture Transformation', 13, 360.00, 'engaged', 'Former CHRO with expertise in building high-performance organizations and managing large-scale change programs.'),
      ('Robert Fitzgerald', 'robert.fitzgerald@multiverse.com', 'Energy Sector Lead', 'Energy Markets, Sustainability, Regulatory Affairs, Project Finance', 20, 480.00, 'engaged', 'Former energy company executive with deep knowledge of renewable transition economics and policy.'),
      ('Lisa Chang', 'lisa.chang@multiverse.com', 'Data Analytics Lead', 'Data Science, Business Intelligence, Predictive Analytics, Machine Learning', 9, 340.00, 'available', 'Stanford-trained data scientist specializing in deriving actionable insights from complex business data.'),
      ('Marcus Johnson', 'marcus.johnson@multiverse.com', 'Real Estate Advisory Partner', 'Commercial Real Estate, Portfolio Management, Asset Valuation, Development Strategy', 17, 430.00, 'engaged', 'Former CBRE executive with experience managing $5B+ commercial real estate portfolios.'),
      ('Natasha Volkov', 'natasha.volkov@multiverse.com', 'M&A Integration Specialist', 'Post-Merger Integration, Due Diligence, Synergy Capture, Cultural Integration', 11, 370.00, 'available', 'Led 20+ successful post-merger integrations across technology and financial services sectors.'),
      ('Thomas Wright', 'thomas.wright@multiverse.com', 'Defense & Aerospace Consultant', 'Government Contracting, Proposal Development, ITAR Compliance, Program Management', 22, 460.00, 'engaged', 'Retired colonel with extensive experience in defense procurement and program management.'),
      ('Sophie Laurent', 'sophie.laurent@multiverse.com', 'Brand Strategy Consultant', 'Brand Strategy, Consumer Insights, Market Research, Go-to-Market', 8, 290.00, 'available', 'Creative strategist with Ogilvy and LVMH background. Expert in luxury and premium brand positioning.'),
      ('Ahmed Hassan', 'ahmed.hassan@multiverse.com', 'Supply Chain Expert', 'Global Supply Chain, Procurement, Vendor Management, Logistics Optimization', 14, 350.00, 'available', 'Former Amazon supply chain leader with expertise in building resilient global supply networks.'),
      ('Catherine Bell', 'catherine.bell@multiverse.com', 'Pharmaceutical Strategy Lead', 'Pharma Strategy, Drug Launch, Market Access, Health Economics', 16, 440.00, 'engaged', 'Former Pfizer strategy VP with expertise in drug commercialization and market access strategies.');
    `);
    console.log('  - 15 talent seeded');

    // Investments (15)
    await client.query(`
      INSERT INTO investments (name, type, amount, target_return, risk_level, status, sector, notes) VALUES
      ('Aurora AI Platform', 'Venture Capital', 5000000.00, 25.00, 'high', 'active', 'Artificial Intelligence', 'Series B investment in enterprise AI platform. Strong traction with Fortune 500 clients.'),
      ('GreenField Solar Fund', 'Private Equity', 12000000.00, 14.00, 'medium', 'active', 'Renewable Energy', 'Solar farm development fund across Southwest US. 20-year PPA contracts secured.'),
      ('MedTech Innovations LP', 'Venture Capital', 3500000.00, 30.00, 'high', 'active', 'Healthcare Technology', 'Early-stage medtech fund focused on diagnostic AI and remote patient monitoring.'),
      ('Pacific Gateway REIT', 'Real Estate', 8000000.00, 9.50, 'low', 'active', 'Commercial Real Estate', 'Class A office and mixed-use properties in Pacific Northwest markets.'),
      ('Digital Infrastructure Fund II', 'Private Equity', 15000000.00, 16.00, 'medium', 'active', 'Technology Infrastructure', 'Data center and fiber optic network investments across North America.'),
      ('EverBlue Water Technology', 'Venture Capital', 2000000.00, 22.00, 'high', 'evaluating', 'CleanTech', 'Series A water purification technology company. Patent-pending membrane technology.'),
      ('Continental Logistics Buyout', 'Private Equity', 20000000.00, 18.00, 'medium', 'active', 'Logistics', 'Leveraged buyout of mid-market logistics firm with strong EBITDA growth.'),
      ('Quantum Computing Seed Fund', 'Venture Capital', 1500000.00, 40.00, 'high', 'evaluating', 'Quantum Computing', 'Seed-stage fund targeting quantum computing hardware and software startups.'),
      ('Heartland Agriculture Fund', 'Private Equity', 10000000.00, 11.00, 'low', 'active', 'Agriculture', 'Farmland acquisition and precision agriculture technology deployment.'),
      ('CyberShield Security', 'Venture Capital', 4000000.00, 28.00, 'high', 'active', 'Cybersecurity', 'Series B cybersecurity company focused on zero-trust enterprise solutions.'),
      ('Nordic Biotech Partners', 'Venture Capital', 6000000.00, 20.00, 'high', 'evaluating', 'Biotechnology', 'Scandinavian biotech fund targeting gene therapy and precision medicine.'),
      ('Metro Housing Development', 'Real Estate', 18000000.00, 12.00, 'medium', 'active', 'Residential Real Estate', 'Affordable housing development projects in major metropolitan areas.'),
      ('TechBridge Debt Fund', 'Debt', 7500000.00, 8.50, 'low', 'active', 'Technology', 'Senior secured lending to growth-stage technology companies.'),
      ('Emerging Markets Growth Fund', 'Hedge Fund', 10000000.00, 15.00, 'high', 'active', 'Diversified', 'Long-short equity strategy focused on emerging market growth companies.'),
      ('SustainaBuild Materials', 'Venture Capital', 3000000.00, 24.00, 'medium', 'evaluating', 'Construction Materials', 'Sustainable building materials manufacturer using recycled composites. Pre-revenue with pilot contracts.');
    `);
    console.log('  - 15 investments seeded');

    // Strategies (15)
    await client.query(`
      INSERT INTO strategies (title, client_name, objective, approach, timeline, status, kpi_targets) VALUES
      ('Digital-First Banking Transformation', 'Apex Financial Group', 'Transform legacy banking operations into a digital-first model to reduce costs by 30% and improve customer NPS by 25 points', 'Three-phase approach: Phase 1 - Core system modernization, Phase 2 - Digital channel deployment, Phase 3 - AI-powered personalization', '18 months', 'active', 'Cost reduction: 30%, NPS improvement: +25pts, Digital adoption: 80%'),
      ('European Market Entry', 'TechNova Solutions', 'Establish market presence in UK, Germany, and France with target revenue of $5M in first year', 'Localization-first strategy with strategic partnerships, regulatory compliance framework, and phased market entry starting with UK', '12 months', 'active', 'Revenue: $5M Year 1, Market share: 3%, Customer acquisition: 50 enterprise clients'),
      ('Clinical Operations Optimization', 'Meridian Healthcare', 'Reduce patient wait times by 40% and improve bed utilization by 25% across all facilities', 'Lean healthcare methodology with predictive analytics for patient flow, staff scheduling optimization, and process standardization', '12 months', 'active', 'Wait time reduction: 40%, Bed utilization: +25%, Patient satisfaction: +20pts'),
      ('Smart Factory Blueprint', 'Evergreen Manufacturing', 'Implement Industry 4.0 capabilities to increase production efficiency by 35% and reduce defect rates by 50%', 'IoT sensor deployment, digital twin modeling, predictive maintenance system, and automated quality inspection', '9 months', 'draft', 'Production efficiency: +35%, Defect rate: -50%, OEE: 85%'),
      ('Unified Commerce Platform', 'Pacific Retail Holdings', 'Create seamless omnichannel experience driving 20% increase in customer lifetime value', 'Headless commerce architecture with unified inventory, personalized customer journeys, and integrated loyalty program', '10 months', 'active', 'CLV increase: 20%, Online revenue: +45%, Store traffic: +15%'),
      ('Carbon Neutral by 2028', 'Quantum Energy Corp', 'Achieve carbon neutrality across all operations by 2028 while maintaining profitability', 'Phased renewable energy adoption, carbon offset portfolio, energy efficiency programs, and green supply chain transformation', '36 months', 'active', 'Carbon reduction: 100%, Energy cost savings: 25%, Green revenue: 60%'),
      ('Global Network Redesign', 'Atlas Logistics International', 'Optimize global logistics network reducing transit times by 20% and costs by 15%', 'Network modeling and simulation, hub consolidation, carrier optimization, and last-mile innovation', '8 months', 'completed', 'Transit time: -20%, Cost reduction: 15%, On-time delivery: 98%'),
      ('Intelligent Claims Processing', 'Silverline Insurance', 'Automate 70% of claims processing with AI while improving accuracy and customer satisfaction', 'NLP-powered document processing, fraud detection ML models, automated decision engine, and human-in-the-loop escalation', '9 months', 'active', 'Automation rate: 70%, Processing time: -60%, Accuracy: 99.5%'),
      ('Portfolio Repositioning Strategy', 'Vanguard Properties', 'Reposition commercial portfolio for post-pandemic market capturing emerging demand patterns', 'Market analysis by submarket, asset-level repositioning plans, selective disposition strategy, and flex-space conversion', '6 months', 'active', 'Portfolio NOI: +18%, Occupancy: 95%, Cap rate compression: 50bps'),
      ('Triple Drug Launch Playbook', 'NexGen Pharmaceuticals', 'Successfully launch three new drugs achieving $500M combined revenue in Year 1', 'Staggered launch timeline, KOL engagement strategy, payer negotiations, patient support programs, and digital marketing', '12 months', 'draft', 'Combined revenue: $500M, Market share: 15%, Formulary access: 80%'),
      ('Defense Modernization Strategy', 'Summit Aerospace', 'Win $2B in new defense contracts through modernized capabilities and bid strategy', 'Capability gap assessment, strategic teaming arrangements, capture management process, and proposal excellence program', '18 months', 'active', 'Win rate: 40%, Pipeline: $5B, New contracts: $2B'),
      ('Workforce of the Future', 'Apex Financial Group', 'Build digital-ready workforce with 100% reskilling of key roles within 18 months', 'Skills assessment, personalized learning paths, digital academies, external hiring for critical gaps, and culture transformation', '18 months', 'completed', 'Reskilling: 100%, Digital fluency: 85%, Attrition: <10%'),
      ('Operational Cost Transformation', 'Meridian Healthcare', 'Achieve $50M in sustainable cost savings while maintaining quality of care', 'Zero-based budgeting, shared services consolidation, procurement optimization, and revenue cycle improvement', '6 months', 'active', 'Cost savings: $50M, Quality scores: maintained, Revenue cycle: +15%'),
      ('Premium Brand Evolution', 'Pacific Retail Holdings', 'Evolve three flagship brands to capture premium market segment with 30% margin improvement', 'Consumer insight research, brand architecture redesign, premium product line development, and experiential retail concepts', '8 months', 'draft', 'Margin improvement: 30%, Brand equity: +20pts, Premium mix: 40%'),
      ('Strategic Alliance Framework', 'BlueBridge Consulting Partners', 'Establish joint venture structure generating $10M in combined revenue within first year', 'Governance framework, shared capability model, joint go-to-market strategy, and profit sharing methodology', '4 months', 'active', 'Joint revenue: $10M, Shared projects: 15, Client satisfaction: 90%');
    `);
    console.log('  - 15 strategies seeded');

    // Tasks (15)
    await client.query(`
      INSERT INTO tasks (title, project_name, assigned_to, priority, status, due_date, description) VALUES
      ('Stakeholder Interview Schedule', 'Digital Transformation Roadmap', 'Dr. Sarah Chen', 'high', 'completed', '2025-09-15', 'Schedule and conduct C-suite stakeholder interviews to map current pain points and digital readiness'),
      ('European Regulatory Analysis', 'Market Expansion Strategy', 'Amara Okafor', 'high', 'in_progress', '2026-01-30', 'Comprehensive analysis of GDPR, financial regulations, and data sovereignty requirements for UK, DE, FR'),
      ('Patient Flow Data Collection', 'Operational Excellence Program', 'Michael Reeves', 'high', 'in_progress', '2026-02-15', 'Collect and analyze patient flow data across all 12 facilities for baseline measurement'),
      ('IoT Vendor Shortlist', 'Industry 4.0 Migration', 'David Park', 'medium', 'pending', '2026-02-28', 'Evaluate and shortlist IoT sensor vendors for smart factory implementation'),
      ('Customer Journey Mapping', 'Omnichannel Retail Strategy', 'Sophie Laurent', 'high', 'in_progress', '2026-01-31', 'Map current and future-state customer journeys across all touchpoints'),
      ('Carbon Footprint Baseline', 'Renewable Energy Transition', 'Robert Fitzgerald', 'high', 'completed', '2025-08-31', 'Complete Scope 1, 2, and 3 carbon footprint assessment across all operations'),
      ('Claims Process Mapping', 'Claims Automation Initiative', 'James Morrison', 'high', 'completed', '2025-12-15', 'Document current claims processing workflows and identify automation opportunities'),
      ('Submarket Analysis Report', 'Portfolio Valuation & Strategy', 'Marcus Johnson', 'high', 'in_progress', '2026-02-28', 'Detailed submarket analysis for all properties in the commercial portfolio'),
      ('Competitive Landscape Assessment', 'Drug Launch Strategy', 'Catherine Bell', 'medium', 'pending', '2026-03-15', 'Analyze competitive positioning for each of the three drug candidates'),
      ('Proposal Development Workshop', 'Defense Contract Optimization', 'Thomas Wright', 'high', 'in_progress', '2026-02-15', 'Facilitate proposal excellence workshop with bid team for upcoming RFP'),
      ('Financial Model Development', 'Digital Transformation Roadmap', 'Elena Vasquez', 'medium', 'in_progress', '2026-03-15', 'Build detailed financial model showing ROI of digital transformation investment'),
      ('Change Management Plan', 'Operational Excellence Program', 'Priya Sharma', 'medium', 'pending', '2026-03-31', 'Develop comprehensive change management and communication plan for all facilities'),
      ('Data Architecture Review', 'Claims Automation Initiative', 'Lisa Chang', 'medium', 'in_progress', '2026-02-28', 'Review existing data architecture and design data pipeline for AI claims processing'),
      ('Supply Chain Risk Assessment', 'Global Supply Chain Optimization', 'Ahmed Hassan', 'high', 'completed', '2025-06-30', 'Identify and assess top 20 supply chain risks and develop mitigation strategies'),
      ('Joint Governance Charter', 'Joint Venture Framework', 'Dr. Sarah Chen', 'high', 'in_progress', '2026-03-15', 'Draft governance charter defining decision rights, escalation paths, and performance metrics');
    `);
    console.log('  - 15 tasks seeded');

    // Proposals (15)
    await client.query(`
      INSERT INTO proposals (title, client_name, value, status, submitted_date, description) VALUES
      ('Digital Transformation Phase II', 'Apex Financial Group', 650000.00, 'submitted', '2026-01-15', 'Continuation of digital transformation roadmap into implementation phase including core system migration and digital channel build-out'),
      ('Asia-Pacific Expansion Advisory', 'TechNova Solutions', 420000.00, 'submitted', '2026-02-01', 'Strategic advisory for market entry into Japan, Singapore, and Australia markets'),
      ('Telehealth Integration Program', 'Meridian Healthcare', 380000.00, 'won', '2025-11-20', 'Design and implementation of telehealth capabilities across the hospital network'),
      ('Predictive Maintenance System', 'Evergreen Manufacturing', 290000.00, 'draft', '2026-03-01', 'Implementation of AI-powered predictive maintenance system across three manufacturing plants'),
      ('Loyalty Program Redesign', 'Pacific Retail Holdings', 185000.00, 'won', '2025-12-10', 'Complete redesign of customer loyalty program with personalized rewards engine'),
      ('Hydrogen Strategy Assessment', 'Quantum Energy Corp', 520000.00, 'submitted', '2026-02-15', 'Assessment of hydrogen energy opportunities and development of go-to-market strategy'),
      ('Fleet Electrification Roadmap', 'Atlas Logistics International', 275000.00, 'submitted', '2026-01-20', 'Strategic roadmap for electrification of delivery fleet across North American operations'),
      ('Underwriting AI Platform', 'Silverline Insurance', 490000.00, 'draft', '2026-03-15', 'AI-powered underwriting decision support platform for commercial lines'),
      ('Mixed-Use Development Strategy', 'Vanguard Properties', 340000.00, 'won', '2025-10-15', 'Strategic advisory for conversion of office properties to mixed-use developments'),
      ('Regulatory Affairs Advisory', 'NexGen Pharmaceuticals', 580000.00, 'submitted', '2026-02-20', 'FDA regulatory strategy and submission support for three new drug applications'),
      ('Satellite Systems Strategy', 'Summit Aerospace', 450000.00, 'draft', '2026-03-10', 'Strategic assessment of commercial satellite communication systems market entry'),
      ('Executive Leadership Program', 'Apex Financial Group', 220000.00, 'won', '2025-09-01', 'Custom executive development program for top 50 leaders focused on digital leadership'),
      ('Revenue Cycle Optimization', 'Meridian Healthcare', 310000.00, 'submitted', '2026-01-30', 'End-to-end revenue cycle optimization to improve collections by 20%'),
      ('Resort Expansion Feasibility', 'Coastal Hospitality Inc', 195000.00, 'submitted', '2026-02-25', 'Feasibility study for three new resort properties in Caribbean and Mediterranean markets'),
      ('Curriculum Digitization Strategy', 'Pinnacle Education Group', 260000.00, 'draft', '2026-03-20', 'Strategy for digitizing curriculum delivery across 25 campus locations with LMS implementation');
    `);
    console.log('  - 15 proposals seeded');

    // Contacts (15)
    await client.query(`
      INSERT INTO contacts (name, email, phone, company, role, relationship, notes) VALUES
      ('Victoria Harrington', 'v.harrington@apexfinancial.com', '+1-212-555-0201', 'Apex Financial Group', 'Chief Financial Officer', 'client', 'Primary sponsor for digital transformation. Monthly executive briefings.'),
      ('Raj Patel', 'raj.patel@technova.io', '+1-415-555-0202', 'TechNova Solutions', 'Chief Executive Officer', 'client', 'Founder-CEO driving expansion. Very hands-on, prefers direct communication.'),
      ('Dr. Margaret Sullivan', 'm.sullivan@meridianhc.com', '+1-617-555-0203', 'Meridian Healthcare', 'Chief Operating Officer', 'client', 'Key decision maker for operational projects. Board-level relationships.'),
      ('Hans Mueller', 'h.mueller@siemens-advisory.de', '+49-89-555-0204', 'Siemens Advisory', 'Managing Director', 'partner', 'Strategic alliance partner for European manufacturing projects.'),
      ('Jennifer Wu', 'j.wu@goldmansachs.com', '+1-212-555-0205', 'Goldman Sachs', 'Vice President', 'referral', 'Refers financial services clients. Met at Davos 2025.'),
      ('Carlos Mendez', 'c.mendez@quantumenergy.com', '+1-713-555-0206', 'Quantum Energy Corp', 'Director of Strategy', 'client', 'Day-to-day project contact for renewable transition engagement.'),
      ('Amanda Foster', 'a.foster@vanguardprop.com', '+1-305-555-0207', 'Vanguard Properties', 'Managing Partner', 'client', 'Executive sponsor for portfolio repositioning. Quarterly reviews.'),
      ('Dr. Richard Okonkwo', 'r.okonkwo@nexgenpharma.com', '+1-609-555-0208', 'NexGen Pharmaceuticals', 'VP Business Development', 'client', 'Leading drug launch strategy engagement. Very data-driven.'),
      ('General (Ret.) James Bradley', 'j.bradley@summitaero.com', '+1-206-555-0209', 'Summit Aerospace', 'SVP Government Relations', 'client', 'Key contact for defense contract strategy. Former Pentagon liaison.'),
      ('Sarah McKenzie', 's.mckenzie@coastalhospitality.com', '+1-843-555-0210', 'Coastal Hospitality Inc', 'General Manager', 'prospect', 'Interested in resort expansion feasibility study. Follow up in March.'),
      ('Prof. David Armstrong', 'd.armstrong@pinnacleedu.org', '+1-202-555-0211', 'Pinnacle Education Group', 'President', 'prospect', 'Initial meeting scheduled for digital curriculum discussion.'),
      ('Michelle Tanaka', 'm.tanaka@pacificretail.com', '+1-310-555-0212', 'Pacific Retail Holdings', 'VP of Strategy', 'client', 'Primary contact for omnichannel and brand repositioning projects.'),
      ('Robert Blake', 'r.blake@bluebridgepartners.com', '+1-646-555-0213', 'BlueBridge Consulting Partners', 'Managing Partner', 'partner', 'Joint venture partner. Weekly alignment calls on shared engagements.'),
      ('Anita Desai', 'a.desai@silverlineins.com', '+1-860-555-0214', 'Silverline Insurance', 'SVP Claims Operations', 'client', 'Operational sponsor for claims automation. Champions AI adoption.'),
      ('Mark Thompson', 'm.thompson@kpmg.com', '+1-212-555-0215', 'KPMG', 'Partner', 'referral', 'Occasional referral source for audit and compliance-adjacent projects.');
    `);
    console.log('  - 15 contacts seeded');

    // Revenue (15)
    await client.query(`
      INSERT INTO revenue (source, client_name, amount, type, date, quarter, status, notes) VALUES
      ('Strategy Engagement', 'Apex Financial Group', 225000.00, 'consulting', '2025-10-15', 'Q4 2025', 'received', 'Phase 1 digital transformation roadmap milestone payment'),
      ('Strategy Engagement', 'Apex Financial Group', 225000.00, 'consulting', '2026-01-15', 'Q1 2026', 'received', 'Phase 1 completion payment and Phase 2 kickoff'),
      ('Market Expansion Advisory', 'TechNova Solutions', 140000.00, 'consulting', '2025-11-01', 'Q4 2025', 'received', 'European market entry strategy - first milestone'),
      ('Operational Excellence', 'Meridian Healthcare', 155000.00, 'consulting', '2025-09-30', 'Q3 2025', 'received', 'Quarterly milestone for operational improvement program'),
      ('Operational Excellence', 'Meridian Healthcare', 155000.00, 'consulting', '2025-12-31', 'Q4 2025', 'received', 'Q4 milestone payment for healthcare operations program'),
      ('Omnichannel Strategy', 'Pacific Retail Holdings', 130000.00, 'consulting', '2025-10-31', 'Q4 2025', 'received', 'Phase 1 customer journey mapping and strategy deliverable'),
      ('Renewable Transition', 'Quantum Energy Corp', 222500.00, 'consulting', '2025-09-30', 'Q3 2025', 'received', 'Quarterly engagement fee for energy transition advisory'),
      ('Renewable Transition', 'Quantum Energy Corp', 222500.00, 'consulting', '2025-12-31', 'Q4 2025', 'received', 'Q4 advisory fee for renewable energy transition program'),
      ('Supply Chain Optimization', 'Atlas Logistics International', 310000.00, 'consulting', '2025-12-31', 'Q4 2025', 'received', 'Final payment for completed supply chain optimization project'),
      ('Claims Automation', 'Silverline Insurance', 118750.00, 'consulting', '2026-01-31', 'Q1 2026', 'received', 'First quarterly milestone for claims automation initiative'),
      ('Portfolio Advisory', 'Vanguard Properties', 190000.00, 'consulting', '2026-01-15', 'Q1 2026', 'received', 'Milestone payment for portfolio valuation and repositioning strategy'),
      ('Defense Strategy', 'Summit Aerospace', 140000.00, 'consulting', '2025-12-15', 'Q4 2025', 'received', 'Quarterly fee for defense contract optimization advisory'),
      ('Investment Return', 'Aurora AI Platform', 750000.00, 'investment', '2025-12-31', 'Q4 2025', 'received', 'Carried interest distribution from Series B mark-up'),
      ('Joint Venture Revenue', 'BlueBridge Consulting Partners', 82500.00, 'partnership', '2026-01-31', 'Q1 2026', 'received', 'Revenue share from joint client engagement'),
      ('Telehealth Advisory', 'Meridian Healthcare', 95000.00, 'consulting', '2026-02-28', 'Q1 2026', 'pending', 'First milestone for telehealth integration program');
    `);
    console.log('  - 15 revenue seeded');

    // KPIs (15)
    await client.query(`
      INSERT INTO kpis (name, category, value, target, unit, trend, period, notes) VALUES
      ('Total Revenue', 'Financial', 3161250.00, 3500000.00, 'USD', 'up', 'Q1 2026', 'Tracking slightly below target. Pipeline strong for Q2.'),
      ('Client Satisfaction (NPS)', 'Client', 72.00, 75.00, 'score', 'up', 'Q1 2026', 'Improving trend. Healthcare clients driving highest scores.'),
      ('Utilization Rate', 'Operations', 78.00, 85.00, 'percent', 'stable', 'Q1 2026', 'Below target due to bench time between engagements.'),
      ('Active Engagements', 'Operations', 11.00, 12.00, 'count', 'up', 'Q1 2026', 'Strong pipeline with 3 proposals in final stages.'),
      ('Proposal Win Rate', 'Sales', 62.00, 65.00, 'percent', 'up', 'Q1 2026', 'Improving from 58% last quarter. Better qualification process.'),
      ('Average Project Value', 'Financial', 425000.00, 400000.00, 'USD', 'up', 'Q1 2026', 'Exceeding target. Larger strategic engagements driving growth.'),
      ('Employee Satisfaction', 'Talent', 8.20, 8.50, 'score', 'stable', 'Q1 2026', 'Annual engagement survey. Focus areas: work-life balance.'),
      ('Talent Retention Rate', 'Talent', 92.00, 95.00, 'percent', 'down', 'Q1 2026', 'Two departures this quarter. Exit interviews indicate market competition.'),
      ('Investment Portfolio IRR', 'Capital', 18.50, 20.00, 'percent', 'up', 'Q1 2026', 'Portfolio performing well. AI investments outperforming.'),
      ('Pipeline Value', 'Sales', 8500000.00, 10000000.00, 'USD', 'up', 'Q1 2026', 'Growing pipeline. New prospects from referral network.'),
      ('On-Time Delivery Rate', 'Operations', 91.00, 95.00, 'percent', 'up', 'Q1 2026', 'Improved from 88% last quarter. Better project management discipline.'),
      ('Revenue Per Consultant', 'Financial', 315000.00, 350000.00, 'USD', 'up', 'Q1 2026', 'Trending upward with higher-value engagements.'),
      ('New Client Acquisition', 'Sales', 3.00, 4.00, 'count', 'stable', 'Q1 2026', 'Three new clients acquired. Two more in final discussions.'),
      ('Cross-Sell Revenue', 'Sales', 450000.00, 500000.00, 'USD', 'up', 'Q1 2026', 'Growing cross-sell within existing client base, especially Apex and Meridian.'),
      ('Carbon Footprint', 'ESG', 125.00, 100.00, 'tons CO2', 'down', 'Q1 2026', 'Reducing through remote work policies and travel optimization.');
    `);
    console.log('  - 15 KPIs seeded');

    // Services (15)
    await client.query(`
      INSERT INTO services (name, category, description, deliverables, duration, price_min, price_max, pricing_model, status) VALUES
      ('Strategic Diagnostic Assessment', 'diagnostic', 'Comprehensive assessment of organizational strategy, operations, and market position to identify growth opportunities and risk areas', 'Executive summary report, SWOT analysis, strategic priority matrix, 90-day action plan', '2-3 weeks', 3500.00, 5000.00, 'fixed-fee', 'active'),
      ('Market Entry Strategy', 'market-entry', 'End-to-end market entry planning including market sizing, competitive analysis, regulatory landscape, and go-to-market roadmap', 'Market sizing report, competitive landscape map, regulatory guide, GTM roadmap, financial projections', '6-8 weeks', 12000.00, 18000.00, 'fixed-fee', 'active'),
      ('AI Readiness Assessment', 'ai-readiness', 'Evaluate organizational readiness for AI adoption across data infrastructure, talent, processes, and governance frameworks', 'AI maturity scorecard, data readiness audit, use case prioritization matrix, implementation roadmap', '3-4 weeks', 5000.00, 8000.00, 'fixed-fee', 'active'),
      ('Digital Transformation Roadmap', 'transformation', 'Comprehensive digital strategy covering technology modernization, process automation, data strategy, and change management', 'Current-state assessment, target architecture blueprint, transformation roadmap, business case, change management plan', '10-16 weeks', 25000.00, 75000.00, 'milestone', 'active'),
      ('Executive Leadership Advisory', 'advisory', 'Ongoing strategic advisory for C-suite executives covering strategy, operations, talent, and board governance', 'Monthly strategy sessions, quarterly board prep materials, ad-hoc advisory calls, executive briefing documents', 'Monthly retainer', 8000.00, 15000.00, 'retainer', 'active'),
      ('C-Suite Executive Search', 'search', 'Full-service executive search for C-level and senior leadership positions including sourcing, screening, assessment, and onboarding support', 'Candidate longlist, shortlist with assessments, interview coordination, offer negotiation support, 90-day onboarding plan', '8-14 weeks', 50000.00, 200000.00, 'success-fee', 'active'),
      ('Operational Excellence Program', 'operations', 'Lean-based operational improvement program targeting cost reduction, process efficiency, and quality enhancement', 'Process maps, waste analysis, improvement initiatives catalog, implementation plan, KPI dashboard design', '12-20 weeks', 30000.00, 80000.00, 'milestone', 'active'),
      ('M&A Due Diligence', 'due-diligence', 'Comprehensive commercial and operational due diligence for mergers, acquisitions, and investment decisions', 'Due diligence report, financial model review, risk assessment matrix, integration planning framework', '4-6 weeks', 20000.00, 50000.00, 'fixed-fee', 'active'),
      ('Brand Strategy & Positioning', 'brand', 'Strategic brand development including market research, competitive positioning, brand architecture, and messaging framework', 'Consumer insights report, brand positioning statement, brand architecture, messaging guide, visual identity brief', '6-8 weeks', 15000.00, 35000.00, 'fixed-fee', 'active'),
      ('Cybersecurity Risk Assessment', 'risk', 'End-to-end cybersecurity risk evaluation covering infrastructure, governance, compliance, and incident response readiness', 'Risk assessment report, vulnerability prioritization, compliance gap analysis, remediation roadmap', '3-5 weeks', 8000.00, 20000.00, 'fixed-fee', 'active'),
      ('Supply Chain Optimization', 'operations', 'Strategic redesign of supply chain network including sourcing, logistics, inventory management, and supplier relationships', 'Network analysis, optimization model, supplier scorecard framework, implementation roadmap, savings forecast', '8-12 weeks', 25000.00, 60000.00, 'milestone', 'active'),
      ('ESG Strategy & Reporting', 'esg', 'Development of ESG strategy, materiality assessment, target setting, and reporting framework aligned with global standards', 'Materiality matrix, ESG strategy document, KPI framework, reporting template, stakeholder communication plan', '6-10 weeks', 18000.00, 40000.00, 'fixed-fee', 'active'),
      ('Revenue Growth Strategy', 'growth', 'Data-driven revenue growth strategy covering pricing optimization, sales effectiveness, customer segmentation, and channel strategy', 'Revenue diagnostic, pricing analysis, customer segmentation model, sales playbook, growth roadmap', '6-8 weeks', 20000.00, 45000.00, 'fixed-fee', 'active'),
      ('Change Management Program', 'change-management', 'Structured change management program for major organizational transformations including communication, training, and adoption tracking', 'Stakeholder analysis, communication plan, training curriculum, adoption metrics dashboard, resistance management toolkit', '12-24 weeks', 15000.00, 50000.00, 'retainer', 'active'),
      ('Innovation Lab Sprint', 'innovation', 'Rapid innovation program using design thinking to ideate, prototype, and validate new business concepts in compressed timeframes', 'Innovation challenge brief, ideation workshop outputs, prototype designs, validation test results, business case for top concepts', '2-4 weeks', 10000.00, 25000.00, 'fixed-fee', 'active');
    `);
    console.log('  - 15 services seeded');

    // Pipeline (15)
    await client.query(`
      INSERT INTO pipeline (deal_name, client_name, contact_email, stage, value, service_type, source, region, probability, expected_close, notes) VALUES
      ('Digital Strategy Engagement', 'Al Rajhi Capital', 'strategy@alrajhicapital.sa', 'proposal', 185000.00, 'Digital Transformation Roadmap', 'referral', 'GCC', 60, '2026-04-30', 'Referred by existing Saudi client. Strong interest in AI-driven banking transformation.'),
      ('Market Entry Advisory - Turkey', 'Carrefour MENA', 'expansion@carrefourmena.com', 'negotiation', 120000.00, 'Market Entry Strategy', 'conference', 'MENA', 75, '2026-04-15', 'Met at Dubai Retail Forum. Expanding grocery format into Turkish market.'),
      ('Operational Review', 'Emirates Steel', 'ops@emiratessteel.ae', 'qualified', 250000.00, 'Operational Excellence Program', 'website', 'GCC', 40, '2026-06-30', 'Inbound inquiry. Looking for lean manufacturing expertise for Mussafah plant.'),
      ('Executive Search - CFO', 'Majid Al Futtaim', 'hr@maf.ae', 'won', 150000.00, 'C-Suite Executive Search', 'linkedin', 'GCC', 100, '2026-03-15', 'Signed engagement. Searching for Group CFO to replace retiring incumbent.'),
      ('ESG Reporting Framework', 'Saudi Aramco Ventures', 'esg@aramcoventures.sa', 'discussion', 320000.00, 'ESG Strategy & Reporting', 'partner', 'GCC', 30, '2026-07-31', 'Early discussions via KPMG referral. Massive scope potential for Vision 2030 alignment.'),
      ('AI Readiness Program', 'Chalhoub Group', 'digital@chalhoub.com', 'proposal', 75000.00, 'AI Readiness Assessment', 'referral', 'MENA', 55, '2026-05-15', 'Luxury retail group exploring AI for personalization and inventory optimization.'),
      ('Growth Strategy', 'Kaspi.kz', 'strategy@kaspi.kz', 'inquiry', 200000.00, 'Revenue Growth Strategy', 'conference', 'Central Asia', 15, '2026-09-30', 'Met CEO at Web Summit. Interested in international expansion strategy from Kazakhstan.'),
      ('Supply Chain Redesign', 'Agility Logistics', 'consulting@agility.com', 'qualified', 280000.00, 'Supply Chain Optimization', 'website', 'MENA', 45, '2026-06-15', 'RFP received. Looking for post-merger supply chain integration across GCC.'),
      ('Brand Repositioning', 'Emaar Hospitality', 'brand@emaar.com', 'proposal', 95000.00, 'Brand Strategy & Positioning', 'linkedin', 'GCC', 50, '2026-05-30', 'Repositioning Address Hotels brand for European market entry.'),
      ('Cybersecurity Assessment', 'Bank Muscat', 'ciso@bankmuscat.om', 'negotiation', 45000.00, 'Cybersecurity Risk Assessment', 'referral', 'GCC', 80, '2026-04-10', 'Regulatory-driven engagement. Central Bank of Oman mandating enhanced cyber frameworks.'),
      ('Innovation Sprint', 'NEOM', 'innovation@neom.sa', 'discussion', 500000.00, 'Innovation Lab Sprint', 'partner', 'GCC', 25, '2026-08-31', 'Exploring smart city innovation sprints. Enormous potential but long procurement cycle.'),
      ('Change Management', 'Turkish Airlines', 'transformation@thy.com', 'qualified', 180000.00, 'Change Management Program', 'conference', 'Europe', 35, '2026-07-15', 'Fleet modernization driving major organizational change. Met at Istanbul Aviation Conference.'),
      ('Due Diligence Advisory', 'Mubadala Investment', 'deals@mubadala.ae', 'won', 85000.00, 'M&A Due Diligence', 'referral', 'GCC', 100, '2026-03-20', 'Commercial due diligence for fintech acquisition target in Southeast Asia.'),
      ('Leadership Advisory', 'DP World', 'ceo-office@dpworld.com', 'lost', 96000.00, 'Executive Leadership Advisory', 'linkedin', 'GCC', 0, '2026-02-28', 'Lost to BCG. Feedback: stronger local team presence required. Follow up in 6 months.'),
      ('Diagnostic Assessment', 'Getir', 'strategy@getir.com', 'inquiry', 35000.00, 'Strategic Diagnostic Assessment', 'website', 'Europe', 20, '2026-06-30', 'Quick commerce company exploring strategic pivot. Early stage, needs nurturing.');
    `);
    console.log('  - 15 pipeline seeded');

    // Invoices (15)
    await client.query(`
      INSERT INTO invoices (invoice_number, client_name, project_name, amount, payment_terms, status, issue_date, due_date, paid_date, payment_method, notes) VALUES
      ('INV-2024-001', 'Apex Financial Group', 'Digital Transformation Roadmap', 225000.00, 'net-30', 'paid', '2025-10-01', '2025-10-31', '2025-10-28', 'wire-transfer', 'Phase 1 milestone payment. Paid on time.'),
      ('INV-2024-002', 'TechNova Solutions', 'Market Expansion Strategy', 140000.00, 'net-30', 'paid', '2025-10-15', '2025-11-14', '2025-11-10', 'wire-transfer', 'First milestone for European expansion advisory.'),
      ('INV-2024-003', 'Meridian Healthcare', 'Operational Excellence Program', 155000.00, 'milestone', 'paid', '2025-09-15', '2025-10-15', '2025-10-12', 'wire-transfer', 'Q3 milestone payment for operational improvement.'),
      ('INV-2024-004', 'Quantum Energy Corp', 'Renewable Energy Transition', 222500.00, '50-upfront', 'paid', '2025-09-01', '2025-09-30', '2025-09-05', 'wire-transfer', 'Quarterly retainer for energy transition advisory.'),
      ('INV-2024-005', 'Pacific Retail Holdings', 'Omnichannel Retail Strategy', 130000.00, 'net-30', 'paid', '2025-10-15', '2025-11-14', '2025-11-20', 'ach', 'Phase 1 customer journey mapping deliverable. Paid 6 days late.'),
      ('INV-2024-006', 'Summit Aerospace', 'Defense Contract Optimization', 140000.00, 'net-30', 'paid', '2025-12-01', '2025-12-31', '2025-12-29', 'wire-transfer', 'Quarterly fee for defense contract advisory.'),
      ('INV-2024-007', 'Apex Financial Group', 'Digital Transformation Roadmap', 225000.00, 'net-30', 'paid', '2026-01-01', '2026-01-31', '2026-01-30', 'wire-transfer', 'Phase 1 completion and Phase 2 kickoff payment.'),
      ('INV-2024-008', 'Silverline Insurance', 'Claims Automation Initiative', 118750.00, 'milestone', 'paid', '2026-01-15', '2026-02-14', '2026-02-12', 'wire-transfer', 'First quarterly milestone for claims automation.'),
      ('INV-2024-009', 'Vanguard Properties', 'Portfolio Valuation & Strategy', 190000.00, 'net-30', 'sent', '2026-02-01', '2026-03-03', NULL, 'pending', 'Milestone payment for portfolio repositioning strategy.'),
      ('INV-2024-010', 'Meridian Healthcare', 'Cost Reduction Program', 72500.00, '50-upfront', 'paid', '2025-12-01', '2025-12-15', '2025-12-08', 'wire-transfer', 'Upfront payment for cost reduction engagement.'),
      ('INV-2024-011', 'BlueBridge Consulting Partners', 'Joint Venture Framework', 82500.00, 'net-30', 'sent', '2026-02-15', '2026-03-17', NULL, 'pending', 'Revenue share invoice for joint engagement Q1.'),
      ('INV-2024-012', 'Meridian Healthcare', 'Telehealth Integration Program', 95000.00, 'milestone', 'overdue', '2026-01-31', '2026-02-28', NULL, 'pending', 'First milestone for telehealth program. Payment follow-up needed.'),
      ('INV-2024-013', 'Majid Al Futtaim', 'Executive Search - Group CFO', 50000.00, '50-upfront', 'paid', '2026-03-01', '2026-03-15', '2026-03-10', 'wire-transfer', 'Upfront retainer for CFO executive search engagement.'),
      ('INV-2024-014', 'Mubadala Investment', 'Fintech Due Diligence', 85000.00, 'net-30', 'draft', '2026-03-20', '2026-04-19', NULL, NULL, 'Due diligence engagement completion payment. Pending final report delivery.'),
      ('INV-2024-015', 'Quantum Energy Corp', 'Renewable Energy Transition', 222500.00, '50-upfront', 'sent', '2026-03-01', '2026-03-31', NULL, 'pending', 'Q1 2026 quarterly advisory fee for energy transition.');
    `);
    console.log('  - 15 invoices seeded');

    // Executive Search (15)
    await client.query(`
      INSERT INTO executive_search (position_title, client_name, role_level, department, compensation_min, compensation_max, required_skills, location, status, candidates_sourced, source_channels, notes) VALUES
      ('Group Chief Financial Officer', 'Majid Al Futtaim', 'C-Suite', 'Finance', 450000.00, 600000.00, 'Retail/conglomerate CFO experience, IFRS expertise, M&A track record, GCC experience preferred', 'Dubai, UAE', 'open', 12, 'linkedin, executive-networks, headhunting', 'Replacing retiring CFO. Board wants candidate in seat by Q3 2026.'),
      ('Chief Technology Officer', 'Al Rajhi Capital', 'C-Suite', 'Technology', 380000.00, 520000.00, 'Digital banking transformation, cloud architecture, AI/ML strategy, Islamic finance familiarity', 'Riyadh, Saudi Arabia', 'open', 8, 'linkedin, headhunting, referrals', 'New role created as part of digital transformation. Saudi nationals preferred per Nitaqat.'),
      ('Chief Digital Officer', 'Emirates Steel', 'C-Suite', 'Digital & Innovation', 320000.00, 450000.00, 'Industry 4.0, IoT, digital twin experience, manufacturing background, change management', 'Abu Dhabi, UAE', 'open', 6, 'linkedin, executive-networks', 'First CDO hire. Need someone who can build digital function from scratch.'),
      ('VP of Strategy', 'Chalhoub Group', 'VP', 'Strategy', 250000.00, 350000.00, 'Luxury retail strategy, omnichannel experience, MENA market knowledge, data-driven decision making', 'Dubai, UAE', 'open', 15, 'linkedin, referrals, headhunting', 'Reporting to Group CEO. Key hire for transformation agenda.'),
      ('Chief Executive Officer', 'NEOM Tech Ventures', 'C-Suite', 'Executive', 500000.00, 750000.00, 'Venture capital experience, deep tech background, startup ecosystem development, visionary leadership', 'NEOM, Saudi Arabia', 'open', 4, 'headhunting, executive-networks', 'Highly confidential search. Requires relocation to NEOM. Exceptional compensation package.'),
      ('Director of Operations', 'Agility Logistics', 'Director', 'Operations', 200000.00, 280000.00, 'Logistics operations, supply chain management, Six Sigma, GCC logistics network knowledge', 'Kuwait City, Kuwait', 'interviewing', 18, 'linkedin, referrals', 'Three finalists identified. Final round interviews scheduled for April.'),
      ('Chief Marketing Officer', 'Emaar Hospitality', 'C-Suite', 'Marketing', 300000.00, 420000.00, 'Hospitality brand management, luxury marketing, digital marketing, international expansion experience', 'Dubai, UAE', 'open', 10, 'linkedin, headhunting, executive-networks', 'Need CMO to lead European brand launch for Address Hotels.'),
      ('Head of ESG', 'Saudi Aramco Ventures', 'VP', 'Sustainability', 280000.00, 380000.00, 'ESG strategy, sustainability reporting, GRI/SASB frameworks, energy sector experience', 'Dhahran, Saudi Arabia', 'open', 7, 'linkedin, executive-networks, referrals', 'Vision 2030 alignment critical. Must understand energy transition landscape.'),
      ('Managing Director - London', 'Multiverse Consulting', 'C-Suite', 'General Management', 350000.00, 500000.00, 'Management consulting leadership, European market development, P&L management, client relationship excellence', 'London, UK', 'interviewing', 22, 'headhunting, referrals, executive-networks', 'Internal search for London office launch. Two strong external candidates plus one internal.'),
      ('Chief Risk Officer', 'Bank Muscat', 'C-Suite', 'Risk Management', 280000.00, 400000.00, 'Banking risk management, Basel III/IV, cybersecurity governance, regulatory compliance, GCC banking experience', 'Muscat, Oman', 'open', 9, 'linkedin, headhunting', 'Regulatory-driven hire. Central Bank of Oman requiring enhanced risk governance.'),
      ('VP of Product', 'Kaspi.kz', 'VP', 'Product', 220000.00, 320000.00, 'Fintech product management, super-app experience, international scaling, data product strategy', 'Almaty, Kazakhstan', 'open', 5, 'linkedin, referrals', 'Key hire for international expansion. Must be willing to relocate to Almaty.'),
      ('Director of AI & Analytics', 'Turkish Airlines', 'Director', 'Technology', 180000.00, 260000.00, 'Airline operations analytics, machine learning, revenue management, predictive maintenance', 'Istanbul, Turkey', 'filled', 20, 'linkedin, headhunting, referrals', 'Position filled. Candidate started March 2026. From Lufthansa Group.'),
      ('Chief Investment Officer', 'Mubadala Investment', 'C-Suite', 'Investments', 500000.00, 700000.00, 'Sovereign wealth fund experience, alternative investments, PE/VC, global macro understanding', 'Abu Dhabi, UAE', 'on-hold', 3, 'executive-networks, headhunting', 'Search paused. Internal restructuring may change role scope. Resume Q2.'),
      ('Head of Digital Commerce', 'Carrefour MENA', 'Director', 'E-Commerce', 190000.00, 270000.00, 'E-commerce operations, grocery digital, marketplace strategy, last-mile delivery, MENA market', 'Dubai, UAE', 'open', 11, 'linkedin, referrals', 'Critical hire for digital grocery expansion across MENA.'),
      ('CFO - North America', 'DP World', 'C-Suite', 'Finance', 400000.00, 550000.00, 'Port/logistics finance, US GAAP, capital markets, M&A, P&L management at scale', 'New York, USA', 'open', 14, 'headhunting, executive-networks, linkedin', 'Regional CFO for North American operations. Must have infrastructure finance background.');
    `);
    console.log('  - 15 executive_search seeded');

    // Case Studies (15)
    await client.query(`
      INSERT INTO case_studies (title, client_name, industry, region, challenge, solution, results, services_used, duration, value_delivered, status, published_date) VALUES
      ('Digital Banking Transformation at Scale', 'Apex Financial Group', 'Financial Services', 'North America', 'Legacy core banking systems causing 40% higher operational costs than industry average, with customer NPS scores declining 15 points over two years', 'Implemented three-phase digital transformation: core system modernization with cloud migration, digital channel deployment across mobile and web, and AI-powered personalization engine for customer engagement', 'Achieved 32% cost reduction in operations, NPS improved by 28 points, digital adoption reached 83% within 12 months, and customer acquisition cost decreased by 45%', 'Digital Transformation Roadmap, Change Management Program, AI Readiness Assessment', '18 months', '$4.2M in annual cost savings', 'published', '2026-01-15'),
      ('Healthcare Operations Excellence Across 12 Facilities', 'Meridian Healthcare', 'Healthcare', 'North America', 'Patient wait times averaging 4.2 hours, bed utilization at 62%, and growing patient dissatisfaction threatening hospital network reputation and revenue', 'Deployed lean healthcare methodology with predictive analytics for patient flow, optimized staff scheduling using AI, and standardized processes across all 12 facilities', 'Wait times reduced by 43% to 2.4 hours, bed utilization improved to 81%, patient satisfaction scores increased by 22 points, and $18M in operational savings identified', 'Operational Excellence Program, AI Readiness Assessment, Change Management Program', '12 months', '$18M operational savings', 'published', '2025-11-20'),
      ('Global Supply Chain Redesign for Logistics Leader', 'Atlas Logistics International', 'Logistics', 'Global', 'Fragmented global logistics network with 23% higher transit times than competitors, rising fuel costs, and lack of visibility across supply chain nodes', 'Conducted network modeling and simulation, consolidated from 47 to 31 hubs, implemented carrier optimization algorithms, and deployed real-time visibility platform', 'Transit times reduced by 21%, logistics costs decreased by 16%, on-time delivery improved from 89% to 97%, and carbon emissions reduced by 12%', 'Supply Chain Optimization, Digital Transformation Roadmap', '8 months', '$24M in annual logistics savings', 'published', '2026-02-10'),
      ('Renewable Energy Transition Strategy', 'Quantum Energy Corp', 'Energy', 'North America', 'Heavy dependence on fossil fuel portfolio with increasing regulatory pressure, ESG investor concerns, and declining margins in traditional energy segments', 'Developed phased renewable transition plan covering solar, wind, and hydrogen investments, carbon offset portfolio design, and green supply chain transformation roadmap', 'Secured $890M in green financing, renewable portfolio grew from 12% to 35% of revenue mix, ESG rating upgraded from BB to A, and new institutional investor interest of $1.2B', 'ESG Strategy & Reporting, Strategic Diagnostic Assessment, Revenue Growth Strategy', '24 months (ongoing)', '$1.2B in new investor interest', 'published', '2025-12-05'),
      ('European Market Entry for Tech Unicorn', 'TechNova Solutions', 'Technology', 'Europe', 'US-focused SaaS company with $180M ARR seeking European expansion but facing complex regulatory landscape, localization challenges, and no brand awareness in target markets', 'Localization-first strategy with phased entry starting UK, then Germany and France. Established strategic partnerships, built regulatory compliance framework, and designed localized go-to-market playbooks', 'Achieved $5.2M European revenue in Year 1, acquired 53 enterprise clients, established partnerships with 4 major system integrators, and hired 45-person European team', 'Market Entry Strategy, Brand Strategy & Positioning, Revenue Growth Strategy', '12 months', '$5.2M Year 1 European revenue', 'published', '2026-03-01'),
      ('AI-Driven Claims Automation in Insurance', 'Silverline Insurance', 'Insurance', 'North America', 'Manual claims processing taking average 14 days, 23% error rate in assessments, rising operational costs, and customer complaints increasing 30% year-over-year', 'Implemented NLP-powered document processing, fraud detection ML models, automated decision engine with human-in-the-loop escalation for complex cases, and integrated customer communication workflows', 'Claims processing time reduced from 14 days to 5.5 days, automation rate reached 68%, error rate dropped to 4%, and customer complaints decreased by 52%', 'AI Readiness Assessment, Digital Transformation Roadmap, Operational Excellence Program', '9 months (ongoing)', '$8.5M projected annual savings', 'draft', NULL),
      ('Commercial Real Estate Portfolio Repositioning', 'Vanguard Properties', 'Real Estate', 'North America', 'Post-pandemic commercial real estate portfolio with 28% vacancy rate, declining NOI, and tenant mix misaligned with emerging demand patterns for flex and mixed-use spaces', 'Conducted submarket-level analysis, developed asset-by-asset repositioning plans, executed selective disposition of underperforming assets, and designed flex-space conversion program', 'Vacancy reduced from 28% to 14%, portfolio NOI increased by 19%, completed 3 successful dispositions at premium valuations, and attracted 12 new premium tenants', 'Strategic Diagnostic Assessment, Revenue Growth Strategy', '6 months', '$32M increase in portfolio value', 'published', '2026-02-20'),
      ('Defense Contract Win Rate Transformation', 'Summit Aerospace', 'Aerospace & Defense', 'North America', 'Win rate on defense contracts at 22%, well below industry average of 35%. Proposal quality inconsistent, capture management process ad hoc, and limited strategic teaming relationships', 'Implemented structured capture management process, established strategic teaming arrangements with 5 prime contractors, redesigned proposal development methodology, and created dedicated proposal excellence center', 'Win rate improved from 22% to 41%, secured $1.8B in new contracts, reduced proposal development time by 30%, and established 5 new strategic teaming agreements', 'Strategic Diagnostic Assessment, Operational Excellence Program, Change Management Program', '18 months', '$1.8B in new defense contracts', 'published', '2026-01-30'),
      ('Omnichannel Retail Transformation', 'Pacific Retail Holdings', 'Retail', 'North America', 'Disconnected online and offline channels, customer lifetime value declining 8% annually, and loyalty program with only 12% engagement rate across 200+ retail locations', 'Designed headless commerce architecture with unified inventory, created personalized customer journeys using AI, integrated loyalty program with real-time rewards, and deployed clienteling tools for store associates', 'Customer lifetime value increased by 22%, loyalty program engagement rose to 34%, online revenue grew 48%, and store traffic increased 16% through digital-to-physical initiatives', 'Digital Transformation Roadmap, Brand Strategy & Positioning, AI Readiness Assessment', '10 months (ongoing)', '$15M incremental annual revenue', 'draft', NULL),
      ('Fintech Market Entry in MENA Region', 'Unnamed Fintech Client', 'Fintech', 'MENA', 'European fintech seeking to enter UAE and Saudi markets but facing complex regulatory requirements, cultural differences in financial services, and entrenched local competitors', 'Developed MENA-specific market entry strategy including regulatory navigation for DFSA and SAMA, partnership strategy with local banks, Arabization of product experience, and phased launch plan', 'Successfully obtained DFSA license in 4 months, launched in UAE with 3 banking partnerships, onboarded 15,000 users in first quarter, and established Saudi expansion pipeline', 'Market Entry Strategy, Strategic Diagnostic Assessment, Revenue Growth Strategy', '6 months', 'Successful MENA market launch', 'published', '2025-10-15'),
      ('Smart Factory Implementation in Manufacturing', 'Evergreen Manufacturing', 'Manufacturing', 'North America', 'Aging manufacturing facilities with OEE of 58%, high defect rates of 4.2%, reactive maintenance causing 15% unplanned downtime, and inability to meet growing demand', 'Designed Industry 4.0 blueprint with IoT sensor deployment, digital twin modeling for production optimization, predictive maintenance system, and automated quality inspection using computer vision', 'OEE improved from 58% to projected 82%, defect rate expected to decrease to 1.5%, predictive maintenance reducing unplanned downtime by 60%', 'Digital Transformation Roadmap, Operational Excellence Program, AI Readiness Assessment', '9 months (in planning)', 'Projected $12M annual efficiency gains', 'draft', NULL),
      ('Talent Strategy Overhaul for Digital Age', 'Apex Financial Group', 'Financial Services', 'North America', 'Critical digital skills gap with only 15% of workforce having digital fluency, attrition rate at 18% for key technical roles, and employer brand not resonating with digital talent', 'Redesigned talent strategy with digital skills assessment, personalized learning paths, digital academy partnerships, targeted hiring for critical gaps, and complete employer brand refresh', 'Digital fluency increased to 67%, technical role attrition decreased to 9%, time-to-hire reduced by 35%, and employer brand ranked in top 25 for financial services', 'Change Management Program, Brand Strategy & Positioning, Strategic Diagnostic Assessment', '18 months', '35% reduction in talent acquisition costs', 'published', '2025-09-20'),
      ('Healthcare Cost Transformation Program', 'Meridian Healthcare', 'Healthcare', 'North America', 'Operating costs 22% above peer benchmark, decentralized procurement spending $45M annually without strategic sourcing, and revenue cycle inefficiencies losing $8M per year', 'Implemented zero-based budgeting, consolidated shared services, redesigned procurement with strategic sourcing, and optimized revenue cycle from patient registration through collections', 'Identified $52M in sustainable cost savings, procurement savings of $11M achieved in first 6 months, revenue cycle improvements generating additional $5M annually', 'Operational Excellence Program, Strategic Diagnostic Assessment', '6 months (ongoing)', '$52M in identified savings', 'draft', NULL),
      ('Joint Venture Framework for Consulting Alliance', 'BlueBridge Consulting Partners', 'Professional Services', 'North America', 'Two complementary consulting firms seeking to formalize alliance but lacking governance structure, shared delivery methodology, and equitable profit-sharing model', 'Developed comprehensive JV governance framework with clear decision rights, designed shared capability model leveraging both firms strengths, created joint go-to-market strategy, and established transparent profit-sharing methodology', 'Joint revenue reached $2.4M in first quarter, 4 shared client engagements launched, client satisfaction at 91%, and pipeline of $8M in joint opportunities identified', 'Strategic Diagnostic Assessment, Revenue Growth Strategy', '4 months', '$2.4M first quarter joint revenue', 'published', '2026-03-10'),
      ('Drug Launch Strategy for Triple Portfolio', 'NexGen Pharmaceuticals', 'Pharmaceuticals', 'North America', 'Three new drugs approaching FDA approval with combined $2B market opportunity but no coordinated launch strategy, limited KOL relationships, and payer access challenges', 'Designed staggered launch timeline optimizing resource allocation, built KOL engagement strategy across 200 key opinion leaders, developed payer negotiation playbooks, and created integrated digital marketing campaigns', 'Launch strategy finalized and approved by board. KOL network of 200 established. Payer pre-negotiations initiated with top 10 PBMs covering 70% of lives', 'Market Entry Strategy, Revenue Growth Strategy, Brand Strategy & Positioning', '12 months (in planning)', 'Targeting $500M Year 1 combined revenue', 'draft', NULL);
    `);
    console.log('  - 15 case_studies seeded');

    // Insights (15)
    await client.query(`
      INSERT INTO insights (title, category, author, summary, content, tags, industry, region, status, published_date, views) VALUES
      ('The AI Transformation Imperative: Why 2026 Is the Tipping Point', 'article', 'Dr. Sarah Chen', 'Enterprise AI adoption is reaching an inflection point in 2026, with organizations that fail to act now risking permanent competitive disadvantage in their industries.', 'The convergence of mature large language models, declining compute costs, and proven enterprise use cases means 2026 represents the tipping point for AI transformation. Our analysis of 500 enterprises across 12 industries reveals that AI-forward organizations are already seeing 23% higher revenue growth and 31% better operational efficiency than peers. The window for fast-follower advantage is closing rapidly.', 'AI, digital transformation, enterprise strategy, competitive advantage', 'Cross-Industry', 'Global', 'published', '2026-02-15', 4520),
      ('MENA Markets 2026: Opportunities Beyond Oil', 'whitepaper', 'Ahmed Hassan', 'A comprehensive analysis of non-oil economic diversification across MENA, highlighting $2.3 trillion in emerging opportunities across technology, tourism, healthcare, and renewable energy.', 'The MENA region is undergoing its most significant economic transformation in decades. Saudi Vision 2030, UAE Centennial 2071, and similar national strategies are creating unprecedented opportunities for businesses and investors. This whitepaper examines the key sectors driving diversification, regulatory developments enabling foreign investment, and practical strategies for market entry and growth.', 'MENA, economic diversification, Vision 2030, market entry, GCC', 'Cross-Industry', 'MENA', 'published', '2026-01-20', 3890),
      ('Building Resilient Supply Chains in an Age of Disruption', 'research', 'James Morrison', 'Research analysis of supply chain resilience strategies across 200 companies, revealing that organizations investing in digital supply chain twins and diversified sourcing achieve 40% faster recovery from disruptions.', 'Our 18-month research study of 200 global companies reveals a clear correlation between supply chain digital maturity and resilience. Companies that have invested in digital twins, real-time visibility platforms, and diversified sourcing strategies recovered from major disruptions 40% faster than peers. This report provides a practical framework for building resilient supply chains.', 'supply chain, resilience, digital twin, disruption, logistics', 'Logistics', 'Global', 'published', '2025-11-10', 2760),
      ('The Future of Executive Leadership in the Age of AI', 'perspective', 'Priya Sharma', 'How AI is reshaping the competencies required for C-suite leaders, and why organizations need to fundamentally rethink their executive development and succession planning approaches.', 'AI is not replacing executives, but it is fundamentally changing what makes an effective leader. Our analysis of 150 C-suite appointments in 2025 reveals a dramatic shift toward leaders who combine traditional strategic thinking with AI literacy, data-driven decision making, and the ability to lead human-AI hybrid teams. Organizations that adapt their leadership development programs now will have a significant advantage.', 'leadership, AI, executive development, succession planning, C-suite', 'Cross-Industry', 'Global', 'published', '2026-03-01', 1890),
      ('GCC Real Estate: Navigating the Post-Boom Landscape', 'market-brief', 'Marcus Johnson', 'Analysis of GCC real estate markets showing a shift from speculative development to value-driven investment, with emerging opportunities in logistics, data centers, and mixed-use developments.', 'The GCC real estate market is maturing from its speculative boom phase into a more sustainable, value-driven landscape. While traditional residential and office segments face oversupply in some submarkets, emerging segments including logistics facilities, data centers, and mixed-use developments offer compelling risk-adjusted returns. This brief provides market-by-market analysis and investment recommendations.', 'real estate, GCC, investment, data centers, logistics, mixed-use', 'Real Estate', 'GCC', 'published', '2026-02-01', 2340),
      ('Digital Health Revolution: From Telehealth to AI Diagnostics', 'article', 'Michael Reeves', 'Healthcare digital transformation is accelerating beyond telehealth into AI-powered diagnostics, personalized medicine, and predictive health management, creating a $500B global market by 2028.', 'The COVID-era telehealth surge was just the beginning. We are now seeing the emergence of AI-powered diagnostic tools that match specialist accuracy, personalized treatment plans driven by genomic data, and predictive health management systems that identify disease risk years in advance. This article examines the key trends, regulatory developments, and investment opportunities in digital health.', 'healthcare, digital health, AI diagnostics, telehealth, personalized medicine', 'Healthcare', 'Global', 'published', '2025-12-15', 3120),
      ('ESG Reporting Maturity: Where MENA Companies Stand in 2026', 'research', 'Robert Fitzgerald', 'Benchmarking study of ESG reporting practices across 100 MENA-listed companies, revealing significant gaps in climate disclosure, social metrics, and governance transparency compared to global standards.', 'Our analysis of 100 MENA-listed companies reveals that while ESG awareness has increased dramatically, reporting maturity lags global standards significantly. Only 23% of surveyed companies provide Scope 3 emissions data, 31% have science-based targets, and 45% have board-level ESG oversight. This report provides a maturity framework and practical roadmap for MENA companies seeking to close the gap.', 'ESG, sustainability, MENA, climate disclosure, governance, reporting', 'Cross-Industry', 'MENA', 'published', '2026-01-10', 2680),
      ('Central Asia: The Next Frontier for Technology Investment', 'whitepaper', 'Amara Okafor', 'Deep dive into Central Asian technology ecosystems, with Kazakhstan, Uzbekistan, and Georgia emerging as surprising hubs for fintech, e-commerce, and digital government innovation.', 'Central Asia is emerging as an unexpected technology frontier. Kazakhstan fintech super-app Kaspi.kz has a higher market cap than many European banks, Uzbekistan digital government initiatives are attracting World Bank funding, and Georgia startup ecosystem is drawing Silicon Valley attention. This whitepaper maps the opportunity landscape across five Central Asian markets.', 'Central Asia, fintech, technology, investment, emerging markets, Kazakhstan', 'Technology', 'Central Asia', 'published', '2026-02-20', 1560),
      ('The Consulting Industry in 2026: Disruption from Within', 'perspective', 'Dr. Sarah Chen', 'How AI-native consulting firms, boutique specialists, and platform-based models are reshaping the management consulting industry, and what traditional firms must do to adapt.', 'The management consulting industry is facing its own disruption. AI-native firms are delivering analytical work at a fraction of traditional costs, boutique specialists are winning premium engagements with deep expertise, and platform models are democratizing access to consulting talent. This perspective examines the forces reshaping the industry and outlines strategies for consulting firms to thrive in the new landscape.', 'consulting, industry trends, AI, disruption, business model', 'Professional Services', 'Global', 'draft', NULL, 0),
      ('Cybersecurity in Financial Services: The 2026 Threat Landscape', 'market-brief', 'Lisa Chang', 'Analysis of evolving cybersecurity threats facing financial institutions, with AI-powered attacks, quantum computing risks, and regulatory tightening demanding a fundamental rethink of security strategies.', 'Financial institutions face an unprecedented cybersecurity challenge in 2026. AI-powered phishing attacks have increased 340% year-over-year, quantum computing threatens current encryption standards within 5-7 years, and regulators are imposing stricter requirements globally. This brief outlines the key threats, regulatory developments, and recommended security posture enhancements for financial services firms.', 'cybersecurity, financial services, AI threats, quantum computing, regulation', 'Financial Services', 'Global', 'published', '2026-03-10', 1230),
      ('Saudi Vision 2030: Progress Report and Investment Implications', 'research', 'Ahmed Hassan', 'Comprehensive assessment of Saudi Vision 2030 implementation progress across all pillars, with analysis of achieved milestones, emerging challenges, and investment implications for international firms.', 'Six years into Vision 2030, Saudi Arabia has achieved remarkable progress in several pillars while facing challenges in others. Tourism targets are being exceeded, entertainment sector is booming, and NEOM is taking physical shape. However, Saudization targets in private sector, non-oil GDP diversification speed, and social transformation metrics show mixed results. This report provides a balanced assessment with actionable implications for investors and businesses.', 'Saudi Arabia, Vision 2030, investment, economic diversification, NEOM', 'Cross-Industry', 'GCC', 'published', '2026-01-30', 5120),
      ('Operational Excellence in the Age of Automation', 'article', 'James Morrison', 'Why traditional lean and Six Sigma methodologies need reinvention for the automated enterprise, and how leading organizations are creating hybrid human-AI operational excellence frameworks.', 'Traditional operational excellence methodologies were designed for human-centric processes. As automation and AI transform operations, organizations need new frameworks that optimize the interplay between human judgment and machine precision. This article presents our Hybrid Operational Excellence framework based on work with 30 global manufacturers and service organizations.', 'operational excellence, lean, automation, AI, manufacturing', 'Manufacturing', 'Global', 'draft', NULL, 0),
      ('Women in Leadership: Progress and Gaps in MENA Boardrooms', 'perspective', 'Priya Sharma', 'Analysis of female representation in MENA corporate leadership showing progress in UAE and Saudi Arabia but persistent gaps in board composition, C-suite appointments, and pipeline development.', 'Female representation in MENA boardrooms has improved notably, with UAE reaching 8.9% and Saudi Arabia 5.2% of board seats in 2025. However, these figures still lag global averages significantly. Our analysis of 200 MENA companies reveals both the progress made and the systemic barriers that continue to limit advancement. Practical recommendations are provided for organizations committed to closing the gap.', 'diversity, leadership, MENA, women in business, governance, inclusion', 'Cross-Industry', 'MENA', 'published', '2026-02-28', 2890),
      ('Private Equity in Healthcare: Navigating Regulatory Complexity', 'whitepaper', 'Catherine Bell', 'Guide for PE investors navigating the increasingly complex regulatory landscape for healthcare investments across North America, Europe, and MENA, with focus on telehealth, diagnostics, and pharma services.', 'Healthcare PE deals reached $125B globally in 2025, but regulatory complexity is increasing across all major markets. This whitepaper provides a practical framework for evaluating regulatory risk in healthcare investments, with detailed analysis of telehealth regulations, diagnostic approval pathways, and pharmaceutical services compliance requirements across 15 key markets.', 'private equity, healthcare, regulation, investment, telehealth, pharma', 'Healthcare', 'Global', 'draft', NULL, 0),
      ('The Rise of Sovereign AI: How Nations Are Building AI Independence', 'article', 'Amara Okafor', 'How governments worldwide are pursuing sovereign AI strategies, investing in national compute infrastructure, and developing regulatory frameworks that will reshape the global AI landscape.', 'The concept of sovereign AI has moved from academic discussion to national policy across 40+ countries. From the UAE AI Strategy to the EU AI Act, nations are investing billions in domestic AI infrastructure, training data sovereignty, and regulatory frameworks. This article examines the implications for enterprises operating across borders and provides guidance for navigating an increasingly fragmented global AI landscape.', 'sovereign AI, regulation, government policy, AI strategy, geopolitics', 'Technology', 'Global', 'published', '2026-03-15', 980);
    `);
    console.log('  - 15 insights seeded');

    // Companies (15)
    await client.query(`
      INSERT INTO companies (name, industry, size, website, headquarters, revenue, relationship, contact_person, phone, notes) VALUES
      ('Apex Financial Group', 'Financial Services', 'Enterprise (5000+)', 'apexfinancial.com', 'New York, NY', 12500000.00, 'Strategic Client', 'James Whitfield', '+1-212-555-0201', 'Long-term strategic relationship, multiple active engagements'),
      ('TechNova Solutions', 'Technology', 'Mid-Market (500-1000)', 'technova.io', 'San Francisco, CA', 85000000.00, 'Active Client', 'Sarah Kim', '+1-415-555-0202', 'Series C startup, high growth trajectory'),
      ('Meridian Healthcare', 'Healthcare', 'Enterprise (10000+)', 'meridianhc.com', 'Boston, MA', 2800000000.00, 'Strategic Client', 'Dr. Robert Chen', '+1-617-555-0203', 'Hospital network with 12 facilities across Northeast'),
      ('Evergreen Manufacturing', 'Manufacturing', 'Large (2000-5000)', 'evergreenmfg.com', 'Chicago, IL', 450000000.00, 'Active Client', 'Michael Torres', '+1-312-555-0204', 'Legacy manufacturer in Industry 4.0 transition'),
      ('Pacific Retail Holdings', 'Retail', 'Enterprise (8000+)', 'pacificretail.com', 'Los Angeles, CA', 1200000000.00, 'Active Client', 'Jennifer Park', '+1-310-555-0205', 'Multi-brand retail portfolio, 200+ locations nationwide'),
      ('Quantum Energy Corp', 'Energy', 'Large (3000-5000)', 'quantumenergy.com', 'Houston, TX', 3500000000.00, 'Strategic Client', 'David Okonkwo', '+1-713-555-0206', 'Major renewable energy transition engagement'),
      ('Atlas Logistics International', 'Logistics', 'Mid-Market (1000-2000)', 'atlaslogistics.com', 'Jacksonville, FL', 280000000.00, 'Active Client', 'Maria Gonzalez', '+1-904-555-0207', 'Global supply chain optimization in progress'),
      ('Pinnacle Education Group', 'Education', 'Mid-Market (500-1000)', 'pinnacleedu.org', 'Washington, DC', 120000000.00, 'Prospect', 'Dr. Amanda Foster', '+1-202-555-0208', 'Exploring digital transformation of curriculum delivery'),
      ('Silverline Insurance', 'Insurance', 'Enterprise (6000+)', 'silverlineins.com', 'Hartford, CT', 5200000000.00, 'Active Client', 'Thomas Blackwell', '+1-860-555-0209', 'Claims process automation initiative underway'),
      ('Vanguard Properties', 'Real Estate', 'Mid-Market (200-500)', 'vanguardprop.com', 'Miami, FL', 890000000.00, 'Active Client', 'Elena Rodriguez', '+1-305-555-0210', 'Commercial portfolio optimization across 5 markets'),
      ('NexGen Pharmaceuticals', 'Pharmaceuticals', 'Large (2000-5000)', 'nexgenpharma.com', 'Princeton, NJ', 1800000000.00, 'Strategic Client', 'Dr. Lisa Chang', '+1-609-555-0211', 'Market entry strategy for 3 new drug portfolios'),
      ('Horizon Media Group', 'Media & Entertainment', 'Mid-Market (800-1500)', 'horizonmedia.com', 'Los Angeles, CA', 340000000.00, 'Inactive', 'Mark Stevens', '+1-323-555-0212', 'Engagement paused, renewal discussions scheduled Q2'),
      ('Summit Aerospace', 'Aerospace & Defense', 'Enterprise (15000+)', 'summitaero.com', 'Seattle, WA', 8900000000.00, 'Active Client', 'Col. Richard Hayes (Ret.)', '+1-206-555-0213', 'Defense contract bid strategy and operations improvement'),
      ('Coastal Hospitality Inc', 'Hospitality', 'Mid-Market (500-1000)', 'coastalhospitality.com', 'Charleston, SC', 95000000.00, 'Prospect', 'Patricia Moore', '+1-843-555-0214', 'Initial discovery phase for resort expansion strategy'),
      ('BlueBridge Consulting Partners', 'Professional Services', 'Small (50-200)', 'bluebridgepartners.com', 'New York, NY', 28000000.00, 'Partner', 'Nathan Brooks', '+1-646-555-0215', 'Alliance partner for joint venture consulting projects');
    `);
    console.log('  - 15 companies seeded');

    // Orders (15)
    await client.query(`
      INSERT INTO orders (order_number, client_name, service, amount, status, order_date, delivery_date, notes) VALUES
      ('ORD-2026-001', 'Apex Financial Group', 'Digital Transformation Roadmap', 450000.00, 'in-progress', '2025-09-01', '2026-03-31', 'Phase 2 of core banking modernization'),
      ('ORD-2026-002', 'TechNova Solutions', 'Market Entry Strategy', 280000.00, 'in-progress', '2025-10-15', '2026-04-15', 'European and Asian market expansion'),
      ('ORD-2026-003', 'Meridian Healthcare', 'Operational Excellence Program', 620000.00, 'in-progress', '2025-07-01', '2026-06-30', 'End-to-end improvement across 12 facilities'),
      ('ORD-2026-004', 'Quantum Energy Corp', 'Strategic Diagnostic Assessment', 180000.00, 'completed', '2025-06-01', '2025-09-30', 'Renewable energy portfolio assessment completed successfully'),
      ('ORD-2026-005', 'Pacific Retail Holdings', 'Brand Strategy & Positioning', 320000.00, 'in-progress', '2025-11-01', '2026-05-31', 'Omnichannel retail transformation program'),
      ('ORD-2026-006', 'NexGen Pharmaceuticals', 'Market Entry Strategy', 550000.00, 'in-progress', '2025-08-01', '2026-08-01', 'Triple drug portfolio launch strategy'),
      ('ORD-2026-007', 'Summit Aerospace', 'Revenue Growth Strategy', 380000.00, 'in-progress', '2025-05-01', '2026-11-01', 'Defense contract win rate transformation'),
      ('ORD-2026-008', 'Silverline Insurance', 'AI Readiness Assessment', 150000.00, 'completed', '2025-04-01', '2025-07-31', 'AI-driven claims automation assessment phase'),
      ('ORD-2026-009', 'Evergreen Manufacturing', 'Digital Transformation Roadmap', 420000.00, 'pending', '2026-01-15', '2026-09-15', 'Smart factory Industry 4.0 implementation'),
      ('ORD-2026-010', 'Atlas Logistics International', 'Operational Excellence Program', 290000.00, 'in-progress', '2025-10-01', '2026-04-01', 'Global supply chain optimization'),
      ('ORD-2026-011', 'Vanguard Properties', 'Strategic Diagnostic Assessment', 175000.00, 'completed', '2025-03-01', '2025-06-30', 'Commercial real estate portfolio repositioning assessment'),
      ('ORD-2026-012', 'Horizon Media Group', 'Change Management Program', 240000.00, 'on-hold', '2025-09-01', '2026-03-01', 'Engagement paused pending client restructuring'),
      ('ORD-2026-013', 'BlueBridge Consulting Partners', 'Revenue Growth Strategy', 160000.00, 'completed', '2025-07-01', '2025-10-31', 'Joint venture framework and go-to-market strategy'),
      ('ORD-2026-014', 'Coastal Hospitality Inc', 'Strategic Diagnostic Assessment', 95000.00, 'pending', '2026-02-01', '2026-05-01', 'Resort expansion discovery and feasibility study'),
      ('ORD-2026-015', 'Pinnacle Education Group', 'Digital Transformation Roadmap', 310000.00, 'pending', '2026-03-01', '2026-09-30', 'Digital curriculum delivery platform design');
    `);
    console.log('  - 15 orders seeded');

    // Candidates (15)
    await client.query(`
      INSERT INTO candidates (name, email, phone, role_applied, experience_years, skills, current_company, expected_salary, industry, region, role_level, linkedin, availability, resume_url, status, notes) VALUES
      ('Alexandra Chen', 'alexandra.chen@email.com', '+1-415-555-0301', 'Senior Strategy Consultant', 12, 'Strategy, M&A, Financial Modeling, Healthcare', 'McKinsey & Company', 185000.00, 'Healthcare', 'North America', 'Senior', 'linkedin.com/in/alexandrachen', '1-month', NULL, 'interviewing', 'Exceptional candidate, 2nd round scheduled March 28'),
      ('Marcus Johnson', 'marcus.j@email.com', '+1-212-555-0302', 'Managing Director - MENA', 18, 'Market Entry, GCC Markets, Oil & Gas, Arabic fluency', 'Bain & Company', 280000.00, 'Energy', 'MENA', 'C-Suite', 'linkedin.com/in/marcusjohnson', '3-months', NULL, 'offer-extended', 'Offer sent March 15, awaiting response by March 30'),
      ('Priya Patel', 'priya.patel@email.com', '+1-617-555-0303', 'Data Science Lead', 8, 'Machine Learning, Python, NLP, Healthcare Analytics', 'Google Health', 210000.00, 'Technology', 'North America', 'Senior', 'linkedin.com/in/priyapatel', '2-weeks', NULL, 'interviewing', 'Strong technical background, culture fit assessment pending'),
      ('Robert Kim', 'robert.kim@email.com', '+1-312-555-0304', 'Principal Consultant', 15, 'Operations, Supply Chain, Manufacturing, Lean Six Sigma', 'Deloitte', 220000.00, 'Manufacturing', 'North America', 'Director', 'linkedin.com/in/robertkim', '1-month', NULL, 'applied', 'Referred by existing partner, resume under review'),
      ('Sofia Martinez', 'sofia.m@email.com', '+1-305-555-0305', 'Associate Consultant', 3, 'Business Analysis, PowerBI, Financial Services, Spanish', 'EY-Parthenon', 95000.00, 'Financial Services', 'North America', 'Junior', 'linkedin.com/in/sofiamartinez', 'immediate', NULL, 'interviewing', 'High-potential early career candidate, strong analytical skills'),
      ('Dr. Ahmed Hassan', 'ahmed.h@email.com', '+971-4-555-0306', 'Senior Advisor - GCC', 22, 'Sovereign Wealth, Islamic Finance, MENA Strategy, Arabic', 'Abu Dhabi Investment Authority', 350000.00, 'Financial Services', 'MENA', 'C-Suite', 'linkedin.com/in/ahmedhassan', '3-months', NULL, 'offer-extended', 'Senior advisory role, unique regional expertise'),
      ('Jennifer Williams', 'jennifer.w@email.com', '+1-206-555-0307', 'Technology Strategy Manager', 10, 'Cloud Architecture, Digital Transformation, Agile, AWS', 'Accenture', 175000.00, 'Technology', 'North America', 'Manager', 'linkedin.com/in/jenniferwilliams', '2-weeks', NULL, 'screening', 'Initial screening call scheduled March 26'),
      ('David Okafor', 'david.o@email.com', '+44-20-555-0308', 'Engagement Manager', 7, 'Project Management, Financial Services, Risk, PMP', 'Oliver Wyman', 155000.00, 'Financial Services', 'Europe', 'Manager', 'linkedin.com/in/davidokafor', '1-month', NULL, 'rejected', 'Strong profile but limited industry fit for current openings'),
      ('Lisa Chang', 'lisa.chang@email.com', '+1-646-555-0309', 'Partner - Financial Services', 20, 'Banking, Fintech, Digital Payments, Board Advisory', 'Boston Consulting Group', 420000.00, 'Financial Services', 'North America', 'C-Suite', 'linkedin.com/in/lisachang', '3-months', NULL, 'interviewing', 'Partner-level hire, final round with founding partners'),
      ('Thomas Müller', 'thomas.m@email.com', '+49-89-555-0310', 'European Market Lead', 14, 'Market Entry, M&A Integration, German Markets, EU Regulation', 'Roland Berger', 240000.00, 'Professional Services', 'Europe', 'Director', 'linkedin.com/in/thomasmuller', '1-month', NULL, 'applied', 'Potential to lead European expansion'),
      ('Amara Osei', 'amara.o@email.com', '+1-404-555-0311', 'ESG & Sustainability Consultant', 6, 'ESG Reporting, Climate Strategy, Sustainability Frameworks', 'KPMG', 130000.00, 'Energy', 'North America', 'Mid-Level', 'linkedin.com/in/amaraosei', 'immediate', NULL, 'interviewing', 'Growing practice area, strong demand for ESG expertise'),
      ('James Morrison', 'james.m@email.com', '+1-713-555-0312', 'Energy Sector Director', 16, 'Oil & Gas, Energy Transition, Renewable Strategy, PE', 'Strategy&', 260000.00, 'Energy', 'North America', 'Director', 'linkedin.com/in/jamesmorrison', '2-weeks', NULL, 'screening', 'Deep energy sector expertise, PE background valuable'),
      ('Catherine Bell', 'catherine.b@email.com', '+1-609-555-0313', 'Healthcare Practice Lead', 13, 'Pharma, Medical Devices, FDA Regulatory, Clinical Ops', 'LEK Consulting', 200000.00, 'Pharmaceuticals', 'North America', 'Director', 'linkedin.com/in/catherinebell', 'immediate', NULL, 'offer-accepted', 'Start date April 14, 2026'),
      ('Michael Reeves', 'michael.r@email.com', '+1-310-555-0314', 'Digital Marketing Strategist', 9, 'Brand Strategy, Digital Marketing, Content, Analytics', 'Publicis Sapient', 145000.00, 'Media & Entertainment', 'North America', 'Senior', 'linkedin.com/in/michaelreeves', '1-month', NULL, 'applied', 'Creative strategist with consulting transition interest'),
      ('Dr. Sarah Chen', 'sarah.chen@email.com', '+1-650-555-0315', 'AI & Analytics Practice Lead', 11, 'AI Strategy, Machine Learning, Data Governance, PhD CS', 'Palantir Technologies', 290000.00, 'Technology', 'North America', 'VP', 'linkedin.com/in/sarahchen', '2-weeks', NULL, 'interviewing', 'Could lead new AI consulting practice, exceptional credentials');
    `);
    console.log('  - 15 candidates seeded');

    // Partners (15)
    await client.query(`
      INSERT INTO partners (name, type, contact_person, email, phone, region, status, partnership_value, description) VALUES
      ('BlueBridge Consulting Partners', 'Strategic Alliance', 'Nathan Brooks', 'nathan@bluebridgepartners.com', '+1-646-555-0401', 'North America', 'active', 2400000.00, 'Joint venture partner for mid-market strategy engagements, shared delivery model'),
      ('Al Rashid Advisory Group', 'Regional Partner', 'Sheikh Khalid Al Rashid', 'khalid@alrashidadvisory.com', '+971-4-555-0402', 'MENA', 'active', 3800000.00, 'Premier MENA market entry partner with sovereign wealth fund relationships'),
      ('EuroConsult GmbH', 'Regional Partner', 'Dr. Hans Weber', 'weber@euroconsult.de', '+49-89-555-0403', 'Europe', 'active', 1500000.00, 'German-speaking markets partner for operational excellence and M&A'),
      ('DataMind Analytics', 'Technology Partner', 'Rachel Foster', 'rachel@datamind.ai', '+1-415-555-0404', 'Global', 'active', 850000.00, 'AI and analytics platform partner powering client data solutions'),
      ('Kensington Legal LLP', 'Professional Services', 'Sir Edward Thornton', 'ethornton@kensingtonlegal.co.uk', '+44-20-555-0405', 'Global', 'active', 600000.00, 'Legal advisory partner for M&A, regulatory compliance, and cross-border transactions'),
      ('Pacific Rim Ventures', 'Investment Partner', 'Yuki Tanaka', 'tanaka@pacificrimvc.com', '+81-3-555-0406', 'Asia Pacific', 'active', 4200000.00, 'Co-investment partner for Asian market opportunities and PE deal flow'),
      ('Sahara Development Partners', 'Regional Partner', 'Amina Bello', 'amina@saharadev.com', '+234-1-555-0407', 'Africa', 'prospect', 0.00, 'Potential partner for West African market expansion, initial discussions'),
      ('CloudFirst Solutions', 'Technology Partner', 'Ryan McCarthy', 'ryan@cloudfirst.io', '+1-206-555-0408', 'North America', 'active', 450000.00, 'Cloud infrastructure and digital transformation technology partner'),
      ('Geneva Wealth Advisors', 'Referral Partner', 'Pierre Dubois', 'dubois@genevawa.ch', '+41-22-555-0409', 'Europe', 'active', 1200000.00, 'High-net-worth client referral partner for family office advisory'),
      ('Bangalore Tech Hub', 'Delivery Partner', 'Rajesh Krishnan', 'rajesh@bangaloretechhub.in', '+91-80-555-0410', 'Asia Pacific', 'active', 320000.00, 'Offshore delivery partner for technology implementation and development'),
      ('Capital Markets Research Group', 'Research Partner', 'Dr. Emily Watson', 'watson@cmrg.com', '+1-212-555-0411', 'Global', 'active', 280000.00, 'Research and thought leadership partner for financial services insights'),
      ('Green Transition Advisors', 'Specialty Partner', 'Henrik Larsson', 'larsson@greentransition.eu', '+46-8-555-0412', 'Europe', 'active', 550000.00, 'ESG and sustainability advisory partner for energy transition engagements'),
      ('MedTech Innovations Ltd', 'Industry Partner', 'Dr. Sarah Mitchell', 'mitchell@medtechinnovations.co.uk', '+44-161-555-0413', 'Europe', 'prospect', 0.00, 'Healthcare technology partner for digital health and diagnostics projects'),
      ('Riyadh Business Forum', 'Institutional Partner', 'Mohammed Al Saud', 'alsaud@riyadhforum.sa', '+966-11-555-0414', 'MENA', 'active', 750000.00, 'Saudi Vision 2030 institutional partner providing market access and government relations'),
      ('Nexus Executive Search', 'Recruitment Partner', 'Amanda Sterling', 'sterling@nexusexec.com', '+1-312-555-0415', 'North America', 'active', 180000.00, 'Executive search referral partner for C-suite and board-level placements');
    `);
    console.log('  - 15 partners seeded');

    // Meetings (15)
    await client.query(`
      INSERT INTO meetings (title, attendees, meeting_date, meeting_time, location, type, status, agenda, notes) VALUES
      ('Apex Financial Q1 Strategy Review', 'James Whitfield, Sarah Kim, Partner Team', '2026-03-28', '09:00', 'Multiverse HQ - Boardroom A', 'client-review', 'scheduled', 'Q1 progress review, Phase 2 planning, budget reconciliation, next quarter priorities', 'Prepare updated financial models and transformation roadmap deck'),
      ('MENA Expansion Planning Workshop', 'Ahmed Hassan, Sheikh Khalid, Leadership Team', '2026-04-02', '10:00', 'Dubai Office - Strategy Room', 'internal', 'scheduled', 'Saudi market entry timeline, partner activation, resource allocation, regulatory landscape update', 'Key meeting for Vision 2030 aligned initiatives'),
      ('NexGen Pharma Launch Readiness', 'Dr. Lisa Chang, Catherine Bell, NexGen Team', '2026-03-26', '14:00', 'Virtual - Zoom', 'client-meeting', 'confirmed', 'Drug launch timeline review, KOL engagement status, payer strategy update', 'Final launch readiness checkpoint before FDA decision'),
      ('Weekly Leadership Standup', 'All Partners and Directors', '2026-03-25', '08:30', 'Multiverse HQ - Executive Suite', 'internal', 'completed', 'Pipeline review, utilization metrics, hiring updates, client escalations', 'Recurring weekly meeting, all hands required'),
      ('Meridian Healthcare Ops Review', 'Dr. Robert Chen, Operations Team', '2026-04-01', '11:00', 'Boston - Client Site', 'client-review', 'scheduled', 'Facility performance scorecards, automation rollout status, cost savings tracking', 'Travel required, 2-day on-site engagement'),
      ('Partner Summit Planning Committee', 'Nathan Brooks, Pierre Dubois, Partner Ops', '2026-03-27', '15:00', 'Virtual - Teams', 'internal', 'scheduled', 'Annual partner summit agenda, speaker lineup, venue selection, sponsorship packages', 'Summit tentatively scheduled for June 2026'),
      ('AI Practice Development Kickoff', 'Dr. Sarah Chen, Priya Patel, Tech Team', '2026-04-03', '10:00', 'Multiverse HQ - Innovation Lab', 'internal', 'scheduled', 'AI practice vision, service offerings, go-to-market strategy, talent needs assessment', 'Critical meeting for new practice area launch'),
      ('Summit Aerospace Contract Review', 'Col. Richard Hayes, Legal Team', '2026-03-29', '13:00', 'Seattle - Client Site', 'client-meeting', 'confirmed', 'Defense contract bid review, compliance requirements, teaming agreement updates', 'Sensitive meeting, NDA protocols apply'),
      ('Quarterly Board Advisory Session', 'Board Members, Senior Partners', '2026-04-15', '09:00', 'Multiverse HQ - Boardroom A', 'board-meeting', 'scheduled', 'Q1 financial results, strategic plan progress, market outlook, M&A pipeline review', 'Full day session with working lunch'),
      ('Evergreen Smart Factory Workshop', 'Michael Torres, Tech Partners, Ops Team', '2026-04-05', '09:30', 'Chicago - Client Manufacturing Floor', 'workshop', 'scheduled', 'IoT deployment planning, digital twin demonstration, predictive maintenance pilot design', '2-day workshop, safety protocols required for floor visit'),
      ('New Hire Orientation - April Cohort', 'HR Team, New Hires, Buddy Mentors', '2026-04-14', '09:00', 'Multiverse HQ - Training Center', 'internal', 'scheduled', 'Company overview, culture onboarding, tools training, practice area introductions', 'Catherine Bell and 3 other new hires starting'),
      ('Pacific Retail Omnichannel Checkpoint', 'Jennifer Park, Digital Team', '2026-03-31', '16:00', 'Virtual - Zoom', 'client-review', 'scheduled', 'Customer journey mapping results, loyalty program analytics, store integration progress', 'Prepare A/B test results from pilot stores'),
      ('Investment Committee - Deal Review', 'Senior Partners, Pacific Rim Ventures', '2026-04-08', '11:00', 'Virtual - Zoom', 'internal', 'scheduled', 'Three potential co-investment opportunities in Asian healthcare, fintech, and clean energy', 'Confidential - restricted distribution'),
      ('Coastal Hospitality Discovery Session', 'Patricia Moore, Strategy Team', '2026-04-10', '10:00', 'Charleston - Client Resort', 'client-meeting', 'scheduled', 'Resort expansion feasibility, market analysis presentation, competitive landscape review', 'First in-person meeting with prospect, bring capabilities deck'),
      ('ESG Practice Roundtable', 'Amara Osei, Henrik Larsson, Green Partners', '2026-04-12', '14:00', 'Virtual - Teams', 'workshop', 'scheduled', 'ESG reporting framework updates, MENA compliance gaps, new service offering design', 'Cross-region collaboration session');
    `);
    console.log('  - 15 meetings seeded');

    // Payments (15)
    await client.query(`
      INSERT INTO payments (amount, currency, service, client_name, invoice_number, payment_method, status, receipt_url, payment_date, notes) VALUES
      (450000.00, 'USD', 'Digital Transformation Roadmap', 'Apex Financial Group', 'INV-2025-001', 'wire', 'completed', NULL, '2025-09-15', 'Phase 1 payment received on time'),
      (140000.00, 'USD', 'Market Entry Strategy', 'TechNova Solutions', 'INV-2025-002', 'wire', 'completed', NULL, '2025-10-20', 'First milestone payment - 50% upfront'),
      (310000.00, 'USD', 'Operational Excellence Program', 'Meridian Healthcare', 'INV-2025-003', 'ach', 'completed', NULL, '2025-07-10', 'Phase 1 milestone payment'),
      (180000.00, 'USD', 'Strategic Diagnostic Assessment', 'Quantum Energy Corp', 'INV-2025-004', 'wire', 'completed', NULL, '2025-06-15', 'Full project payment - completed engagement'),
      (160000.00, 'USD', 'Brand Strategy & Positioning', 'Pacific Retail Holdings', 'INV-2025-005', 'stripe', 'completed', NULL, '2025-11-10', 'First milestone payment'),
      (275000.00, 'USD', 'Market Entry Strategy', 'NexGen Pharmaceuticals', 'INV-2025-006', 'wire', 'completed', NULL, '2025-08-15', 'Phase 1 - Strategy development payment'),
      (190000.00, 'USD', 'Revenue Growth Strategy', 'Summit Aerospace', 'INV-2025-007', 'wire', 'completed', NULL, '2025-05-20', 'First milestone - capture management setup'),
      (150000.00, 'USD', 'AI Readiness Assessment', 'Silverline Insurance', 'INV-2025-008', 'ach', 'completed', NULL, '2025-04-10', 'Full payment for assessment phase'),
      (210000.00, 'USD', 'Digital Transformation Roadmap', 'Evergreen Manufacturing', 'INV-2026-009', 'wire', 'pending', NULL, NULL, 'Awaiting PO approval from procurement'),
      (145000.00, 'USD', 'Operational Excellence Program', 'Atlas Logistics International', 'INV-2025-010', 'stripe', 'completed', NULL, '2025-10-15', 'Phase 1 payment via Stripe'),
      (175000.00, 'USD', 'Strategic Diagnostic Assessment', 'Vanguard Properties', 'INV-2025-011', 'wire', 'completed', NULL, '2025-03-15', 'Full project payment'),
      (120000.00, 'USD', 'Change Management Program', 'Horizon Media Group', 'INV-2025-012', 'check', 'failed', NULL, NULL, 'Payment bounced - engagement on hold'),
      (160000.00, 'USD', 'Revenue Growth Strategy', 'BlueBridge Consulting Partners', 'INV-2025-013', 'ach', 'completed', NULL, '2025-07-20', 'JV framework project payment'),
      (47500.00, 'USD', 'Strategic Diagnostic Assessment', 'Coastal Hospitality Inc', 'INV-2026-014', 'stripe', 'pending', NULL, NULL, '50% upfront for discovery engagement'),
      (155000.00, 'USD', 'Digital Transformation Roadmap', 'Pinnacle Education Group', 'INV-2026-015', 'wire', 'pending', NULL, NULL, 'Awaiting contract signature');
    `);
    console.log('  - 15 payments seeded');

    console.log('\nSeeding complete! 330 total rows inserted across 22 tables.');

  } catch (err) {
    console.error('Seeding error:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
    console.log('Database connection closed.');
    process.exit(0);
  }
}

seed();
