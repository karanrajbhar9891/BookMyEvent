import Event from "../models/Event.js";

export const getAllEvents = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.location) {
      filter.location = req.query.location;
    }
    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: "i" };
    }

    const events = await Event.find(filter);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const eventData = await Event.findById(req.params.id);
    if (!eventData) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(eventData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event" });
  }
};

export const createEvent = async (req, res) => {
  const {
    title,
    description,
    date,
    location,
    ticketPrice,
    capacity,
    category,
    availableSeats,
    imageUrl,
    totalSeats,
  } = req.body;
  try {
    const newEvent = await Event.create({
      title,
      description,
      date,
      location,
      ticketPrice,
      capacity,
      category,
      availableSeats,
      imageUrl,
      totalSeats,
      createdBy: req.user._id,
    });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Error creating event" });
  }
};

export const updateEvent = async (req, res) => {
  const {
    title,
    description,
    date,
    location,
    ticketPrice,
    capacity,
    category,
    availableSeats,
    imageUrl,
    totalSeats,
  } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        date,
        location,
        ticketPrice,
        capacity,
        category,
        availableSeats,
        imageUrl,
        totalSeats,
      },
      { new: true },
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error updating event" });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event" });
  }
};
