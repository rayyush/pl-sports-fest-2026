const sportsData = {
  indoor: {
    id: "indoor",
    name: "Indoor Games",
    description: "Indoor sports and games",
    icon: "🏠",

    sports: [
      {
        id: "table-tennis",
        name: "Table Tennis",
        icon: "🏓",
        description: "Singles and doubles table tennis",

        categories: [
          {
            id: "tt-singles",
            name: "Singles",
            ageGroup: "15+",
            format: "singles",
            players: 1,
            feePerPlayer: 200,
          },
          {
            id: "tt-doubles",
            name: "Doubles",
            ageGroup: "15+",
            format: "doubles",
            players: 2,
            feePerPlayer: 200,
          },
        ],
      },

      {
        id: "chess",
        name: "Chess",
        icon: "♟️",
        description: "Individual chess competition",

        categories: [
          {
            id: "chess-open",
            name: "Open",
            ageGroup: "15+",
            format: "singles",
            players: 1,
            feePerPlayer: 200,
          },
        ],
      },

      {
        id: "carrom",
        name: "Carrom",
        icon: "🎯",
        description: "Singles and doubles carrom",

        categories: [
          {
            id: "carrom-singles",
            name: "Singles",
            ageGroup: "15+",
            format: "singles",
            players: 1,
            feePerPlayer: 200,
          },
          {
            id: "carrom-doubles",
            name: "Doubles",
            ageGroup: "15+",
            format: "doubles",
            players: 2,
            feePerPlayer: 200,
          },
        ],
      },

      {
        id: "pool",
        name: "Pool",
        icon: "🎱",
        description: "Pool competition",

        categories: [
          {
            id: "pool-singles",
            name: "Singles",
            ageGroup: "15+",
            format: "singles",
            players: 1,
            feePerPlayer: 200,
          },
        ],
      },
    ],
  },

  outdoor: {
    id: "outdoor",
    name: "Outdoor Sports",
    description: "Outdoor sports competitions",
    icon: "🌳",

    sports: [
      {
        id: "badminton",
        name: "Badminton",
        icon: "🏸",
        description: "Singles and doubles badminton",

        categories: [
          {
            id: "mens-singles",
            name: "Men's Singles",
            ageGroup: "15+",
            format: "singles",
            players: 1,
            feePerPlayer: 200,
          },
          {
            id: "womens-singles",
            name: "Women's Singles",
            ageGroup: "15+",
            format: "singles",
            players: 1,
            feePerPlayer: 200,
          },
          {
            id: "mens-doubles",
            name: "Men's Doubles",
            ageGroup: "15+",
            format: "doubles",
            players: 2,
            feePerPlayer: 200,
          },
          {
            id: "womens-doubles",
            name: "Women's Doubles",
            ageGroup: "15+",
            format: "doubles",
            players: 2,
            feePerPlayer: 200,
          },
          {
            id: "mixed-doubles",
            name: "Mixed Doubles",
            ageGroup: "15+",
            format: "doubles",
            players: 2,
            feePerPlayer: 200,
          },
        ],
      },
      {
        id: "tennis",
        name: "Tennis",
        icon: "🎾",
        description: "Tennis competition",

        categories: [
          {
            id: "tennis-singles",
            name: "Singles",
            ageGroup: "15+",
            format: "singles",
            players: 1,
            feePerPlayer: 200,
          },
          {
            id: "tennis-doubles",
            name: "Doubles",
            ageGroup: "15+",
            format: "doubles",
            players: 2,
            feePerPlayer: 200,
          },
        ],
      },

      {
        id: "basketball",
        name: "Basketball",
        icon: "🏀",
        description: "Basketball competition",

        categories: [
          {
            id: "basketball-team",
            name: "Team",
            ageGroup: "15+",
            format: "team",
            players: 1,
            feePerPlayer: 200,
          },
        ],
      },

      {
        id: "football",
        name: "Football",
        icon: "⚽",
        description: "Society football tournament",

        ageGroup: "16+",
        fee: 300,

        externalRegistration: true,

        registrationUrl: "YOUR_GOOGLE_FORM_URL",
      },
    ],
  },

  field: {
    id: "field",
    name: "Field Games",
    description: "Field events on 15 August",
    icon: "🏃",

    sports: [
      {
        id: "50m-race",
        name: "50m Race",
        icon: "🏃",
        description: "50 metre race",

        categories: [
          {
            id: "50m-under-14",
            name: "Under 14",
            ageGroup: "Under 14",
            format: "singles",
            players: 1,
            feePerPlayer: 100,
          },
          {
            id: "50m-15-plus",
            name: "15+",
            ageGroup: "15+",
            format: "singles",
            players: 1,
            feePerPlayer: 200,
          },
        ],
      },

      {
        id: "relay-race",
        name: "Relay Race",
        icon: "🏃‍♂️",
        description: "Relay race",

        categories: [
          {
            id: "relay-open",
            name: "Open",
            ageGroup: "15+",
            format: "team",
            players: 1,
            feePerPlayer: 200,
          },
        ],
      },

      {
        id: "long-jump",
        name: "Long Jump",
        icon: "🦘",
        description: "Long jump competition",

        categories: [
          {
            id: "long-jump-under-14",
            name: "Under 14",
            ageGroup: "Under 14",
            format: "singles",
            players: 1,
            feePerPlayer: 100,
          },
          {
            id: "long-jump-15-plus",
            name: "15+",
            ageGroup: "15+",
            format: "singles",
            players: 1,
            feePerPlayer: 200,
          },
        ],
      },
    ],
  },
};

export { sportsData as tournamentData };
export default sportsData;
