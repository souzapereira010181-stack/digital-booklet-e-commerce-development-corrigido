import {
  pgTable,
  serial,
  text,
  varchar,
  decimal,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: varchar("role", { length: 20 }).notNull().default("customer"),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  icon: varchar("icon", { length: 10 }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  shortDescription: text("short_description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  categoryId: integer("category_id").references(() => categories.id),
  coverImage: text("cover_image"),
  pages: integer("pages"),
  format: varchar("format", { length: 20 }).default("PDF"),
  tags: text("tags").array(),
  buyLink: text("buy_link"),
  featured: boolean("featured").default(false),
  active: boolean("active").default(true),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("5.00"),
  reviewCount: integer("review_count").default(0),
  salesCount: integer("sales_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  customerName: varchar("customer_name", { length: 255 }),
  customerEmail: varchar("customer_email", { length: 255 }),
  items: jsonb("items").notNull(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  paymentMethod: varchar("payment_method", { length: 50 }),
  couponCode: varchar("coupon_code", { length: 50 }),
  discount: decimal("discount", { precision: 10, scale: 2 }).default("0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const coupons = pgTable("coupons", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  discountType: varchar("discount_type", { length: 20 }).notNull().default("percentage"),
  discountValue: decimal("discount_value", { precision: 10, scale: 2 }).notNull(),
  minPurchase: decimal("min_purchase", { precision: 10, scale: 2 }).default("0"),
  maxUses: integer("max_uses"),
  usedCount: integer("used_count").default(0),
  active: boolean("active").default(true),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Coupon = typeof coupons.$inferSelect;
