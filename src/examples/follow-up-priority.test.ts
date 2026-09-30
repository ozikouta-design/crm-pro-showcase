import assert from "node:assert/strict";
import test from "node:test";
import { getFollowUpPriority } from "./follow-up-priority.ts";

test("closed records do not need follow-up", () => {
  assert.equal(
    getFollowUpPriority({
      isClosed: true,
      daysSinceLastContact: 30,
      daysUntilNextAction: -2,
    }),
    "none",
  );
});

test("an overdue next action is urgent", () => {
  assert.equal(
    getFollowUpPriority({
      isClosed: false,
      daysSinceLastContact: 2,
      daysUntilNextAction: -1,
    }),
    "urgent",
  );
});

test("an action due within three days is high priority", () => {
  assert.equal(
    getFollowUpPriority({
      isClosed: false,
      daysSinceLastContact: 1,
      daysUntilNextAction: 3,
    }),
    "high",
  );
});

test("a record without a planned action is high priority after two weeks", () => {
  assert.equal(
    getFollowUpPriority({
      isClosed: false,
      daysSinceLastContact: 14,
      daysUntilNextAction: null,
    }),
    "high",
  );
});

test("a record with a later planned action remains normal", () => {
  assert.equal(
    getFollowUpPriority({
      isClosed: false,
      daysSinceLastContact: 1,
      daysUntilNextAction: 8,
    }),
    "normal",
  );
});
