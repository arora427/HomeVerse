const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const Property = require('./models/Property');

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');

    // Clear existing data
    await User.deleteMany({});
    await Property.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create demo user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const user = new User({
      name: 'Rajesh Kumar',
      email: 'rajesh@homeverse.in',
      password: hashedPassword,
      phone: '+91-9876543210'
    });

    await user.save();
    console.log('👤 Demo user created');
    console.log('   Email: rajesh@homeverse.in');
    console.log('   Password: password123');

    // Create properties with Indian data
    const properties = [
      {
        title: 'Luxury Villa in South Mumbai',
        description: 'Beautiful 3 BHK villa in the heart of South Mumbai. Newly renovated with modern amenities, sea view from balcony, and premium Italian marble flooring.',
        price: 85000,
        location: 'Malabar Hill, Mumbai, Maharashtra',
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 2450,
        propertyType: 'rent',
        images: ['/assets/images/property-1.jpg'],
        owner: user._id,
        agent: {
          name: 'Ananya Sharma',
          avatar: '/assets/images/author.jpg'
        }
      },
      {
        title: 'Modern Apartment in Cyber City',
        description: 'Spacious 2 BHK apartment in Gurgaon\'s prime location. Close to metro station, malls, and IT parks. Perfect for working professionals.',
        price: 12500000,
        location: 'Cyber City, Gurgaon, Haryana',
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1850,
        propertyType: 'sale',
        images: ['/assets/images/property-2.jpg'],
        owner: user._id,
        agent: {
          name: 'Vikram Singh',
          avatar: '/assets/images/author.jpg'
        }
      },
      {
        title: 'Cozy 2BHK in Koramangala',
        description: 'Fully furnished apartment in Bangalore\'s most happening locality. Near restaurants, pubs, and shopping centers. Ready to move in.',
        price: 45000,
        location: 'Koramangala, Bengaluru, Karnataka',
        bedrooms: 2,
        bathrooms: 1,
        squareFeet: 1200,
        propertyType: 'rent',
        images: ['/assets/images/property-3.jpg'],
        owner: user._id,
        agent: {
          name: 'Priya Patel',
          avatar: '/assets/images/author.jpg'
        }
      },
      {
        title: 'Luxury Penthouse in Banjara Hills',
        description: 'Stunning 4 BHK penthouse with private terrace and swimming pool. Premium location in Hyderabad with city skyline views.',
        price: 28000000,
        location: 'Banjara Hills, Hyderabad, Telangana',
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 3500,
        propertyType: 'sale',
        images: ['/assets/images/property-4.png'],
        owner: user._id,
        agent: {
          name: 'Arjun Reddy',
          avatar: '/assets/images/author.jpg'
        }
      },
      {
        title: 'Premium 3BHK in Sector 62',
        description: 'Well-maintained apartment in Noida with kids play area, gym, and 24/7 security. Great connectivity to Delhi and Ghaziabad.',
        price: 38000,
        location: 'Sector 62, Noida, Uttar Pradesh',
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1650,
        propertyType: 'rent',
        images: ['/assets/images/property-1.jpg'],
        owner: user._id,
        agent: {
          name: 'Meera Gupta',
          avatar: '/assets/images/author.jpg'
        }
      },
      {
        title: 'Sea View Apartment in Marine Drive',
        description: 'Iconic location with breathtaking Arabian Sea views. Art deco building with classic Mumbai charm and modern interiors.',
        price: 95000000,
        location: 'Marine Drive, Mumbai, Maharashtra',
        bedrooms: 3,
        bathrooms: 3,
        squareFeet: 2800,
        propertyType: 'sale',
        images: ['/assets/images/property-2.jpg'],
        owner: user._id,
        agent: {
          name: 'Karan Mehta',
          avatar: '/assets/images/author.jpg'
        }
      },
      {
        title: 'Spacious Villa in Anna Nagar',
        description: 'Independent house with garden in Chennai\'s premium residential area. Perfect for families looking for peace and privacy.',
        price: 55000,
        location: 'Anna Nagar, Chennai, Tamil Nadu',
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 3200,
        propertyType: 'rent',
        images: ['/assets/images/property-3.jpg'],
        owner: user._id,
        agent: {
          name: 'Lakshmi Iyer',
          avatar: '/assets/images/author.jpg'
        }
      },
      {
        title: 'Modern Flat in Satellite Area',
        description: 'Brand new 2 BHK in Ahmedabad\'s developed locality. Close to schools, hospitals, and shopping complexes.',
        price: 6500000,
        location: 'Satellite, Ahmedabad, Gujarat',
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1350,
        propertyType: 'sale',
        images: ['/assets/images/property-4.png'],
        owner: user._id,
        agent: {
          name: 'Amit Shah',
          avatar: '/assets/images/author.jpg'
        }
      }
    ];

    await Property.insertMany(properties);
    console.log(`🏠 ${properties.length} properties created`);

    console.log('\n✨ Seed data created successfully!');
    console.log('\nYou can now login with:');
    console.log('Email: rajesh@homeverse.in');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
};

seedData();
