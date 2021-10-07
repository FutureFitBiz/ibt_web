

export const sdgs = [{
    image: '1',
    title: 'No Poverty',
    text: 'End poverty in all forms everywhere',
  },
  {
    image: '2',
    title: 'Zero Hunger',
    text: 'End hunger, achieve food security and improved nutrition and promote sustainable agriculture',
  },
  {
    image: '3',
    title: 'Good Health and Well-Being',
    text: 'Ensure healthy lives and promote well-being for all at all ages',
  },

  {
    image: '4',
    title: 'Quality Education',
    text: 'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all',
  },
  {
    image: '5',
    title: 'Gender Equality',
    text: 'Achieve gender equality and empower all woman and girls',
  },

  {
    image: '6',
    title: 'Clean Water and Sanitation',
    text: 'Ensure availability and sustainable management of water and sanitation for all',
  },
  {
    image: '7',
    title: 'Affordable and Clean Energy',
    text: 'Ensure access to affordable, reliable, sustainable and modern energy for all',
  },
  {
    image: '8',
    title: 'Decent Work and Economic Growth',
    text: 'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all',
  },
  {
    image: '9',
    title: 'Industry, Innovation and Infrastructure',
    text: 'Build resilient infrastructure, promote inclusive and sustainable industrialisation and foster innovation',
  },
  {
    image: '10',
    title: 'Reduced Inequalities',
    text: 'Reduce inequality within and among countries',
  },
  {
    image: '11',
    title: 'Sustainable Cities and Communities',
    text: 'Make cities and human settlements inclusive, safe, resilient and sustainable',
  },
  {
    image: '12',
    title: 'Responsible Consumption and Production',
    text: 'Ensure sustainable consumption and production patterns',
  },
  {
    image: '13',
    title: 'Climate Action',
    text: 'Take urgent action to combat climate change and its impacts',
  },
  {
    image: '14',
    title: 'Life Below Water',
    text: 'Conserve and sustainably use the oceans, seas and marine resources for sustainable development',
  },
  {
    image: '15',
    title: 'Life on Land',
    text: 'Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss',
  },
  {
    image: '16',
    title: 'Peace, Justice and Strong Institutions',
    text: 'Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels',
  },
  {
    image: '17',
    title: 'Partnerships',
    text: 'Strengthen the means of implementation and revitalise the global partnership for sustainable development',
  },
]

export const stakeholderGroups = [
  [{
      title: 'Indirect Consumers',
      text: 'The individuals who are the end-users of the Company’s products, services and projects.',
    },

    {
      title: 'Customers (Businesses)',
      text: 'The businesses who purchase the Company’s products/services.',
    },

    {
      title: 'Employees',
      text: 'The individuals who work for the Company.',
    },
  ],
  [

    {
      title: 'Customers (Individuals)',
      text: 'Individuals who are affected by the Company’s activities, but do not fall into other categories.',
    },
    {
      title: 'Environment',
      text: 'Ecosystems that the Company affects through its business activities.',
    },
    {
      title: 'Communities / Society',
      text: "Whole communities – or networks of communities – affected by the Company’s activities. Used for broad outcomes (national, regional etc.), where measurement of individual effects are difficult.",
    },
  ]
]

export const glossary = [
  [{
      title: 'Data Awareness',
      text: ['The degree to which a company has access to and collects the data points needed to measure progress towards mitigating an ESG Risk topic.'],
    },
    {
      title: 'Depth',
      text: ['The degree of change experienced by the stakeholder.'],
    },
    {
      title: 'Environmental, Social and Governance (ESG)',
      text: ['Companies create positive and negative impacts in these areas, which are measurable but usually are not reflected in financial statements. Performance on these topics directly affects the wellbeing of people and the planet.'],
    },
  ],
  [{
      title: 'ESG Risks',
      text: [
        'These are areas where companies risk inadvertently creating negative impacts that affect people or the planet.',
        "Based on the Future-Fit’s Break-Even Goals, a set of minimum-performance environmental, social and governance targets which every business must eventually reach to ensure it protects people and the planet."
      ],
    },
    {
      title: "Positive Impacts",
      text: [
        "Activities which go beyond the responsibility of a company to help advance society towards a sustainable future where people and the environment can flourish.",
        "Based on the Future-Fit’s Positive Pursuit topics, and the specific actions that companies can take to achieve them.",
      ],
    },
  ],
  [{
      title: "Impact",
      text: [
        "Positive and negative effects produced by an activity or intervention, directly or indirectly, intended or unintended.",
        "",
      ],
    },

    {
      title: "Progress Indicator",
      text: [
        "A measure of a company’s performance in relation to eliminating negative impacts pertaining to the relevant ESG Risk area.",
      ],
    },
    {
      title: "Scale",
      text: [
        "The number of individuals experiencing an impact.",
      ],
    },
    {
      title: "SDG Targets",
      text: [
        "There are multiple specific Targets for each individual SDG, and 169 SDG Targets in total. They were created in order to provide specific, measurable steps that would help in accomplishing the SDGs.",
      ],
    },
  ]
]


export const intensityInfo = [{
    title: "Significance",
    subtitle: "The importance of the outcome experienced to the affected stakeholder.",
    items: [{
        value: 0,
        title: "Supplemental",
        text: "Outcome is a measurable improvement, but beneficiaries describe issue as low-urgency or low-magnitude.",
      },
      {
        value: 1,
        title: "Substantial",
        text: "Outcome addresses a med-to-high magnitude issue which prevents stakeholder from achieving positive outcomes.",
      },
      {
        value: 2,
        title: "Critical",
        text: "Outcome addresses an immediate threat to the stakeholder, or reverses the effects of previous harm.",
      },
    ]
  },

  {
    title: "Duration",
    subtitle: "The length of time that the outcome is experienced by the affected stakeholder.",
    items: [{
        value: 0,
        title: "One-time",
        text: "Action causes short-term outcome, but the action would need to be repeated to sustain the effect.",
      },
      {
        value: 1,
        title: "Fixed period",
        text: "Action causes outcome to occur over a continuous period, but has expected end-date or useful life.",
      },
      {
        value: 2,
        title: "Indefinite",
        text: "Action causes a permanent or indefinite outcome for the stakeholder.",
      },
    ]
  },

  {
    title: "Proportion",
    subtitle: "The degree to which the company’s action drives an outcome.",
    items: [{
        value: 0,
        title: "Supporting",
        text: "Action provides a minor component of the overall outcome, or increases the likelihood or speed of delivery.",
      },
      {
        value: 1,
        title: "Essential",
        text: "Action fulfils an essential role in delivering the outcome, but other components / actions are required.",
      },
      {
        value: 2,
        title: "Comprehensive",
        text: "Action delivers the outcome with little or no additional action required.",
      },
    ]
  },
]
