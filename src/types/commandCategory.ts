export type CommandCategory =
    (typeof CommandCategory)[keyof typeof CommandCategory];

export const CommandCategory = {
    Administration: "Administration",
    Economy: "Economy",
    Fun: "Fun",
    Moderation: "Moderation",
    Utility: "Utility",
} as const;
