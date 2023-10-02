"use server";

import { ConnectToDatabase } from "../mongoose";

export async function createQuestion(params: any) {
  // eslint-disable-next-line no-empty
  try {
    ConnectToDatabase();
  } catch (error) {}
}
