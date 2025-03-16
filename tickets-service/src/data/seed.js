const { Ticket } = require('../models');

const seedTickets = async () => {
  const tickets = [
    {
      title: 'Taylor Swift Concert',
      description: 'The Eras Tour - Experience the music of all her eras in one magical night.',
      price: 299.99,
      category: 'concert',
      venue: 'National Stadium',
      date: '2024-03-15 14:00:00-05',
      totalSeats: 100,
      availableSeats: 100,
      status: 'published',
      imageUrl: 'https://example.com/taylor-swift.jpg',
      userId: 1
    },
    {
      title: 'NBA Finals Game 1',
      description: 'Watch the best basketball teams compete for the championship.',
      price: 199.99,
      category: 'sports',
      venue: 'Sports Arena',
      date: '2024-06-01 15:00:00-05',
      totalSeats: 80,
      availableSeats: 80,
      status: 'published',
      imageUrl: 'https://example.com/nba-finals.jpg',
      userId: 1
    },
    {
      title: 'The Lion King Musical',
      description: "Disney's award-winning musical celebrates life's great adventure.",
      price: 149.99,
      category: 'theater',
      venue: 'Grand Theater',
      date: '2024-04-20 13:30:00-05',
      totalSeats: 120,
      availableSeats: 120,
      status: 'published',
      imageUrl: 'https://example.com/lion-king.jpg',
      userId: 1
    },
    {
      title: 'Ed Sheeran Live',
      description: 'Mathematics Tour - An intimate evening with Ed Sheeran.',
      price: 249.99,
      category: 'concert',
      venue: 'City Arena',
      date: '2024-05-10 14:30:00-05',
      totalSeats: 90,
      availableSeats: 90,
      status: 'published',
      imageUrl: 'https://example.com/ed-sheeran.jpg',
      userId: 1
    },
    {
      title: 'Coldplay World Tour',
      description: 'Music of the Spheres World Tour - A cosmic journey through music.',
      price: 279.99,
      category: 'concert',
      venue: 'Olympic Stadium',
      date: '2024-07-15 19:00:00-05',
      totalSeats: 150,
      availableSeats: 150,
      status: 'published',
      imageUrl: 'https://example.com/coldplay.jpg',
      userId: 1
    },
    {
      title: 'Formula 1 Grand Prix',
      description: 'Experience the thrill of F1 racing live!',
      price: 399.99,
      category: 'sports',
      venue: 'City Circuit',
      date: '2024-08-20 13:00:00-05',
      totalSeats: 200,
      availableSeats: 200,
      status: 'published',
      imageUrl: 'https://example.com/f1.jpg',
      userId: 1
    },
    {
      title: 'Hamilton Musical',
      description: 'The revolutionary story of Alexander Hamilton comes to life.',
      price: 189.99,
      category: 'theater',
      venue: 'Broadway Theater',
      date: '2024-09-10 19:30:00-05',
      totalSeats: 100,
      availableSeats: 100,
      status: 'published',
      imageUrl: 'https://example.com/hamilton.jpg',
      userId: 1
    },
    {
      title: 'UFC Championship Fight',
      description: 'Ultimate fighting championship main event.',
      price: 299.99,
      category: 'sports',
      venue: 'Fight Arena',
      date: '2024-10-05 20:00:00-05',
      totalSeats: 80,
      availableSeats: 80,
      status: 'published',
      imageUrl: 'https://example.com/ufc.jpg',
      userId: 1
    }
  ];

  for (const ticket of tickets) {
    await Ticket.create(ticket);
  }
};

module.exports = { seedTickets }; 