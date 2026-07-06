export type CommandCategory =
    (typeof CommandCategory)[keyof typeof CommandCategory];

export const CommandCategory = {
    Administration: "Administraton",
    Economy: "Economy",
    Fun: "Fun",
    Moderation: "Moderation",
    Utility: "Utility",
} as const;
