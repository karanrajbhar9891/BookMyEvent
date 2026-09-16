import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User from "./models/User.js";
import Event from "./models/Event.js";
import Booking from "./models/Booking.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    // ==========================
    // CONNECT TO MONGODB
    // ==========================

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected");

    // ==========================
    // DELETE OLD DATA
    // ==========================

    await Booking.deleteMany({});
    await Event.deleteMany({});
    await User.deleteMany({});

    console.log("Old Data Deleted");

    // ==========================
    // HASH PASSWORD
    // ==========================

    const hashedPassword = await bcrypt.hash("123456", 10);

    // ==========================
    // USERS
    // ==========================

    const users = await User.insertMany([
      {
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
        isVerified: true,
      },
      {
        name: "Karan Rajbhar",
        email: "karan@gmail.com",
        password: hashedPassword,
        role: "user",
        isVerified: true,
      },
      {
        name: "Rahul Sharma",
        email: "rahul@gmail.com",
        password: hashedPassword,
        role: "user",
        isVerified: true,
      },
      {
        name: "Priya Singh",
        email: "priya@gmail.com",
        password: hashedPassword,
        role: "user",
        isVerified: true,
      },
      {
        name: "Aman Verma",
        email: "aman@gmail.com",
        password: hashedPassword,
        role: "user",
        isVerified: true,
      },
      {
        name: "Neha Gupta",
        email: "neha@gmail.com",
        password: hashedPassword,
        role: "user",
        isVerified: true,
      },
    ]);

    console.log("Users Inserted");

    // ==========================
    // EVENTS
    // ==========================

    const eventData = [
      {
        title: "React Summit 2026",
        description:
          "Advanced React workshop with industry experts covering React, hooks, performance and modern frontend development.",
        date: new Date("2026-09-10T10:00:00"),
        location: "Delhi",
        ticketPrice: 999,
        capacity: 300,
        category: "Technology",
        totalSeats: 300,
        availableSeats: 240,
        imageUrl:
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop",
      },

      {
        title: "Node.js Conference",
        description:
          "Learn backend development using Node.js, Express.js, MongoDB and modern server-side technologies.",
        date: new Date("2026-09-18T10:00:00"),
        location: "Noida",
        ticketPrice: 799,
        capacity: 250,
        category: "Technology",
        totalSeats: 250,
        availableSeats: 180,
        imageUrl:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop",
      },

      {
        title: "AI & Machine Learning Expo",
        description:
          "Explore the future of Artificial Intelligence, Machine Learning, automation and generative AI.",
        date: new Date("2026-10-05T11:00:00"),
        location: "Bangalore",
        ticketPrice: 1499,
        capacity: 500,
        category: "Technology",
        totalSeats: 500,
        availableSeats: 420,
        imageUrl:
          "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&auto=format&fit=crop",
      },

      {
        title: "Music Festival",
        description:
          "Experience India's biggest live music festival featuring amazing artists and unforgettable performances.",
        date: new Date("2026-10-20T18:00:00"),
        location: "Mumbai",
        ticketPrice: 1799,
        capacity: 800,
        category: "Music",
        totalSeats: 800,
        availableSeats: 620,
        imageUrl:
          "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop",
      },

      {
        title: "EDM Night",
        description:
          "Dance all night with top DJs, incredible music, spectacular lights and an unforgettable atmosphere.",
        date: new Date("2026-11-02T20:00:00"),
        location: "Goa",
        ticketPrice: 1999,
        capacity: 600,
        category: "Music",
        totalSeats: 600,
        availableSeats: 500,
        imageUrl:
          "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop",
      },

      {
        title: "Stand-up Comedy Night",
        description:
          "Enjoy a hilarious evening featuring some of India's best stand-up comedians.",
        date: new Date("2026-09-25T19:30:00"),
        location: "Lucknow",
        ticketPrice: 499,
        capacity: 250,
        category: "Comedy",
        totalSeats: 250,
        availableSeats: 200,
        imageUrl:
          "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&auto=format&fit=crop",
      },

      {
        title: "Business Startup Meetup",
        description:
          "Connect with startup founders, entrepreneurs, investors and business professionals.",
        date: new Date("2026-11-15T10:00:00"),
        location: "Hyderabad",
        ticketPrice: 899,
        capacity: 350,
        category: "Business",
        totalSeats: 350,
        availableSeats: 300,
        imageUrl:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop",
      },

      {
        title: "Digital Marketing Bootcamp",
        description:
          "Master SEO, social media marketing, Google Ads, content marketing and digital strategy.",
        date: new Date("2026-12-05T09:30:00"),
        location: "Pune",
        ticketPrice: 699,
        capacity: 300,
        category: "Business",
        totalSeats: 300,
        availableSeats: 230,
        imageUrl:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop",
      },

      {
        title: "Cricket Championship",
        description:
          "Watch an exciting national-level cricket tournament featuring some of India's best teams.",
        date: new Date("2026-12-18T15:00:00"),
        location: "Ahmedabad",
        ticketPrice: 1999,
        capacity: 1000,
        category: "Sports",
        totalSeats: 1000,
        availableSeats: 900,
        imageUrl:
          "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop",
      },

      {
        title: "Football League Final",
        description:
          "Watch India's best football clubs compete for the championship in an exciting final.",
        date: new Date("2026-12-22T18:00:00"),
        location: "Kolkata",
        ticketPrice: 1599,
        capacity: 900,
        category: "Sports",
        totalSeats: 900,
        availableSeats: 760,
        imageUrl:
          "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop",
      },

      {
        title: "Photography Workshop",
        description:
          "Learn professional photography techniques, camera settings, composition and photo editing.",
        date: new Date("2026-10-12T10:00:00"),
        location: "Jaipur",
        ticketPrice: 599,
        capacity: 150,
        category: "Workshop",
        totalSeats: 150,
        availableSeats: 110,
        imageUrl:
          "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=800&auto=format&fit=crop",
      },

      {
        title: "Cooking Masterclass",
        description:
          "Learn professional cooking techniques and delicious recipes from experienced chefs.",
        date: new Date("2026-11-28T11:00:00"),
        location: "Chandigarh",
        ticketPrice: 899,
        capacity: 200,
        category: "Workshop",
        totalSeats: 200,
        availableSeats: 170,
        imageUrl:
          "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop",
      },
    ];

    // ==========================
    // ADD CREATED BY
    // ==========================

    const events = eventData.map((event) => ({
      ...event,
      createdBy: users[0]._id,
    }));

    const insertedEvents = await Event.insertMany(events);

    console.log(`${insertedEvents.length} Events Inserted`);

    // ==========================
    // BOOKINGS
    // ==========================

    const bookings = [
      {
        userId: users[1]._id,
        eventId: insertedEvents[0]._id,
        status: "confirmed",
        paymentStatus: "paid",
        amount: insertedEvents[0].ticketPrice,
      },
      {
        userId: users[2]._id,
        eventId: insertedEvents[1]._id,
        status: "pending",
        paymentStatus: "non_paid",
        amount: insertedEvents[1].ticketPrice,
      },
      {
        userId: users[3]._id,
        eventId: insertedEvents[2]._id,
        status: "confirmed",
        paymentStatus: "paid",
        amount: insertedEvents[2].ticketPrice,
      },
      {
        userId: users[4]._id,
        eventId: insertedEvents[3]._id,
        status: "confirmed",
        paymentStatus: "paid",
        amount: insertedEvents[3].ticketPrice,
      },
      {
        userId: users[5]._id,
        eventId: insertedEvents[4]._id,
        status: "pending",
        paymentStatus: "non_paid",
        amount: insertedEvents[4].ticketPrice,
      },
      {
        userId: users[1]._id,
        eventId: insertedEvents[5]._id,
        status: "confirmed",
        paymentStatus: "paid",
        amount: insertedEvents[5].ticketPrice,
      },
      {
        userId: users[2]._id,
        eventId: insertedEvents[6]._id,
        status: "cancelled",
        paymentStatus: "paid",
        amount: insertedEvents[6].ticketPrice,
      },
      {
        userId: users[3]._id,
        eventId: insertedEvents[7]._id,
        status: "confirmed",
        paymentStatus: "paid",
        amount: insertedEvents[7].ticketPrice,
      },
      {
        userId: users[4]._id,
        eventId: insertedEvents[8]._id,
        status: "pending",
        paymentStatus: "non_paid",
        amount: insertedEvents[8].ticketPrice,
      },
      {
        userId: users[5]._id,
        eventId: insertedEvents[9]._id,
        status: "confirmed",
        paymentStatus: "paid",
        amount: insertedEvents[9].ticketPrice,
      },
      {
        userId: users[2]._id,
        eventId: insertedEvents[10]._id,
        status: "confirmed",
        paymentStatus: "paid",
        amount: insertedEvents[10].ticketPrice,
      },
      {
        userId: users[3]._id,
        eventId: insertedEvents[11]._id,
        status: "pending",
        paymentStatus: "non_paid",
        amount: insertedEvents[11].ticketPrice,
      },
    ];

    await Booking.insertMany(bookings);

    console.log(`${bookings.length} Bookings Inserted`);

    // ==========================
    // SUCCESS
    // ==========================

    console.log("");
    console.log("Database Seeded Successfully!");
    console.log("----------------------------------");
    console.log("Admin Login");
    console.log("Email    : admin@gmail.com");
    console.log("Password : 123456");
    console.log("----------------------------------");
    console.log("User Login");
    console.log("Email    : karan@gmail.com");
    console.log("Password : 123456");
    console.log("----------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("Seed Error:", error);
    process.exit(1);
  }
};

seedDatabase();
