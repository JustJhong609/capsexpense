import { 
  IonContent, 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonList, 
  IonItem, 
  IonLabel,
  IonToggle
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle slot="end" />
          </IonItem>
          
          <IonItem>
            <IonLabel>Currency</IonLabel>
            <IonLabel slot="end">USD ($)</IonLabel>
          </IonItem>
          
          <IonItem>
            <IonLabel>Categories</IonLabel>
          </IonItem>
          
          <IonItem>
            <IonLabel>Budget Limits</IonLabel>
          </IonItem>
          
          <IonItem>
            <IonLabel>Export Data</IonLabel>
          </IonItem>
          
          <IonItem>
            <IonLabel>About</IonLabel>
          </IonItem>
        </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default Settings;