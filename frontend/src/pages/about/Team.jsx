
import Navbar from '../../components/navbar/Navbar';
import './team.css';

const teamMembers = [
  {
    name: "Pema Wangchuk",
    role: "Fullstack Developer",
    logo: "https://cdn-icons-png.flaticon.com/128/921/921347.png",
    website: "https://pelmaa.netlify.app",
    image:
      "https://media-del1-1.cdn.whatsapp.net/v/t61.24694-24/491868579_718230300609029_1705008702836889964_n.jpg?ccb=11-4&oh=01_Q5Aa1wF4TeN98OimkTyM8yflL6GYjbAZaXx_E7lQAk1BTeVv1g&oe=685CECFD&_nc_sid=5e03e0&_nc_cat=107",
  },
  {
    name: "Jamyang Dolma",
    role: "Frontend Developer",
    logo: "https://cdn-icons-png.flaticon.com/128/1995/1995524.png",
    website: "https://jamyang-profile.netlify.app",
    image: "https://jamyang-profile.netlify.app/profile.jpeg",
  },
  {
    name: "Phurba Wangmo Sherpa",
    role: "Frontend Developer",
    logo: "https://cdn-icons-png.flaticon.com/128/1995/1995524.png",
    website: "https://phurbawangmo.netlify.app",
    image: "https://phurbawangmo.netlify.app/myphoto.jpg",
  },
  {
    name: "Tak Nath Dahal",
    role: "Frontend Developer",
    logo: "https://cdn-icons-png.flaticon.com/128/1995/1995524.png",
    website: "https://tek-nath.netlify.app",
    image:
      "https://th.bing.com/th/id/OIP.xeyvrTy4NaFs8QqyJVxhFwHaHa?w=208&h=208&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
  {
    name: "Phuntsho Galey Namgay",
    role: "Backend Developer",
    logo: "https://cdn-icons-png.flaticon.com/128/3575/3575821.png",
    website: "https://galeynamgay.netlify.app",
    image:
      "https://th.bing.com/th/id/OIP.OBJB6UE95QMV4ay8hl7bHQHaLI?w=122&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
];

const Team = () => {
  return (<div><Navbar/>
   <div className="team-container">
      <div className="team-overlay">
        <div className="team-header">
          <h2 className="team-title">🎬 The Creative Minds Behind WatchBuddy</h2>
          <p className="team-subtitle">
            Meet our talented team — developers who dream, code, and build
            the future of Bhutan's tech scene.
          </p>
        </div>
        
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="card-image-container">
                <img 
                  src={member.image} 
                  alt={`${member.name}'s profile`} 
                  className="team-profile" 
                />
                <div className="card-logo">
                  <img src={member.logo} alt="role logo" />
                </div>
              </div>
              
              <div className="card-content">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <a 
                  href={member.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="member-website"
                >
                  Visit Portfolio
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div></div>
   
  );
};

export default Team;