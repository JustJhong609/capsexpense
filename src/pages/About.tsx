import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButtons,
    IonBackButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar
  } from '@ionic/react';
  import { chevronBack, informationCircle, logoGithub, logoIonic, person } from 'ionicons/icons';
  import './About.css';
  
  const About: React.FC = () => {
    const authors = [
      {
        name: "Just Jhong",
        github: "JustJhong609",
        avatar: "https://github.com/JustJhong609.png",
        role: "Frontend/Backend Developer"
      },
      {
        name: "Samantha Nics",
        github: "SamanthaNics17",
        avatar: "https://github.com/SamanthaNics17.png",
        role: "Pancit Canton Cooker"
      },
      {
        name: "Christian Cholo",
        github: "ChristianCholo20",
        avatar: "https://github.com/ChristianCholo20.png",
        role: "Pancit Canton Purchaser"
      }
    ];
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton 
                icon={chevronBack} 
                text="" 
                className="custom-back-button"
              />
            </IonButtons>
            <IonTitle>About</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent className="about-content">
          {/* Project Information Card */}
          <IonCard className="project-card">
            <IonCardHeader>
              <IonCardTitle>About The Project</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                This project was developed as part of the fulfillment requirements for 
                the Final Term Project in the subject Application Development (App-Dev).
              </p>
              <p className="tech-stack">
                Built with: <span>Ionic React</span> • <span>Supabase</span> • <span>Vite</span>
              </p>
              <p className="made-with">
                Made with Beer: 🍺 • Coffee ☕ • and Love ❤️
              </p>
            </IonCardContent>
          </IonCard>

          {/* Acknowledgments Card */}
          <IonCard className="acknowledgment-card">
            <IonCardHeader>
              <IonCardTitle>Acknowledgments</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                Special thanks to our NBSC-ICS Instructor for the guidance and support throughout this project.
                Sir Cliff Amadeus F. Evangelio
              </p>
              <p>
            
                <a href="https://github.com/cliffamadeus" target="_blank" rel="noopener noreferrer">
                  <IonIcon icon={logoGithub} /> github.com/cliffamadeus
                </a>
              </p>
            </IonCardContent>
          </IonCard>
  
          <IonCard className="authors-card">
            <IonCardHeader>
              <IonCardTitle>Development Team</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList lines="none" className="authors-list">
                {authors.map((author, index) => (
                  <IonItem 
                    key={index} 
                    button 
                    href={`https://github.com/${author.github}`}
                    target="_blank"
                    className="author-item"
                  >
                    <IonAvatar slot="start">
                      <img 
                        src={author.avatar} 
                        alt={author.name} 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://ionicframework.com/docs/img/demos/avatar.svg';
                        }}
                      />
                    </IonAvatar>
                    <IonLabel>
                      <h3>{author.name}</h3>
                      <p>{author.role}</p>
                      <p className="github-handle">@{author.github}</p>
                    </IonLabel>
                    <IonIcon 
                      icon={logoGithub} 
                      slot="end" 
                      color="dark"
                    />
                  </IonItem>
                ))}
              </IonList>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  };
  
  export default About;