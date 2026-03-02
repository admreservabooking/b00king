import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const hotelBooking = mysqlTable("hotelBooking", {
  id: int("id").autoincrement().primaryKey(),
  propertyName: varchar("propertyName", { length: 255 }).notNull(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  address: text("address"),
  rating: int("rating"),
  reviewCount: int("reviewCount"),
  checkInDate: varchar("checkInDate", { length: 50 }),
  checkOutDate: varchar("checkOutDate", { length: 50 }),
  hospedageValue: int("hospedageValue"),
  paymentLink30: text("paymentLink30"),
  clientEmail: varchar("clientEmail", { length: 320 }),
  clientPhone: varchar("clientPhone", { length: 20 }),
  guestCount: int("guestCount"),
  detail1: text("detail1"),
  detail2: text("detail2"),
  detail3: text("detail3"),
  roomType: varchar("roomType", { length: 255 }),
  breakfastIncluded: int("breakfastIncluded").default(0),
  freeCancellationDate: varchar("freeCancellationDate", { length: 50 }),
  mainGuestName: varchar("mainGuestName", { length: 255 }),
  photos: text("photos"), // JSON array
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type HotelBooking = typeof hotelBooking.$inferSelect;
export type InsertHotelBooking = typeof hotelBooking.$inferInsert;