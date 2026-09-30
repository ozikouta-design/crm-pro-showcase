/**
 * Generic portfolio example, written specifically for this showcase.
 * It is not copied from or representative of CRM-Pro's production logic.
 */
export type FollowUpRecord = {
  isClosed: boolean;
  daysSinceLastContact: number;
  daysUntilNextAction: number | null;
};

export type FollowUpPriority = "none" | "normal" | "high" | "urgent";

/** Assigns a simple follow-up priority from synthetic, non-production inputs. */
export function getFollowUpPriority(
  record: FollowUpRecord,
): FollowUpPriority {
  if (record.isClosed) return "none";

  if (record.daysUntilNextAction !== null && record.daysUntilNextAction < 0) {
    return "urgent";
  }

  if (record.daysUntilNextAction !== null && record.daysUntilNextAction <= 3) {
    return "high";
  }

  if (record.daysUntilNextAction === null && record.daysSinceLastContact >= 14) {
    return "high";
  }

  return "normal";
}
