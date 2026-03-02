import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { hotelBooking } from "../drizzle/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  hotelBooking: router({
    getDefault: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return null;
      const result = await db.select().from(hotelBooking).limit(1);
      return result.length > 0 ? result[0] : null;
    }),
    update: publicProcedure
      .input(z.object({
        propertyName: z.string(),
        clientName: z.string(),
        address: z.string().optional(),
        rating: z.number().optional(),
        reviewCount: z.number().optional(),
        checkInDate: z.string().optional(),
        checkOutDate: z.string().optional(),
        hospedageValue: z.number().optional(),
        paymentLink30: z.string().optional(),
        clientEmail: z.string().optional(),
        clientPhone: z.string().optional(),
        guestCount: z.number().optional(),
        detail1: z.string().optional(),
        detail2: z.string().optional(),
        detail3: z.string().optional(),
        roomType: z.string().optional(),
        breakfastIncluded: z.boolean().optional(),
        freeCancellationDate: z.string().optional(),
        mainGuestName: z.string().optional(),
        photos: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        
        const existing = await db.select().from(hotelBooking).limit(1);
        
        if (existing.length > 0) {
          await db.update(hotelBooking)
            .set({
              ...input,
              breakfastIncluded: input.breakfastIncluded ? 1 : 0,
            })
            .where(eq(hotelBooking.id, existing[0].id));
          return { success: true, id: existing[0].id };
        } else {
          await db.insert(hotelBooking).values({
            propertyName: input.propertyName,
            clientName: input.clientName,
            address: input.address,
            rating: input.rating,
            reviewCount: input.reviewCount,
            checkInDate: input.checkInDate,
            checkOutDate: input.checkOutDate,
            hospedageValue: input.hospedageValue,
            paymentLink30: input.paymentLink30,
            clientEmail: input.clientEmail,
            clientPhone: input.clientPhone,
            guestCount: input.guestCount,
            detail1: input.detail1,
            detail2: input.detail2,
            detail3: input.detail3,
            roomType: input.roomType,
            breakfastIncluded: input.breakfastIncluded ? 1 : 0,
            freeCancellationDate: input.freeCancellationDate,
            mainGuestName: input.mainGuestName,
            photos: input.photos,
          });
          return { success: true, id: 1 };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;

import { criarLinkInfinitePay } from "./infinitepay";

app.post("/api/pagar", async (req, res) => {
  try {
    const link = await criarLinkInfinitePay();
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar pagamento" });
  }
});

