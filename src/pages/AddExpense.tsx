import { 
  IonContent, 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonSelect, 
  IonSelectOption, 
  IonButton, 
  IonDatetime,
  IonTextarea
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const AddExpense: React.FC = () => {
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will handle form submission later
    history.push('/dashboard');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Expense</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">Amount*</IonLabel>
            <IonInput 
              type="number" 
              inputmode="decimal"
              required
            />
          </IonItem>
          
          <IonItem>
            <IonLabel position="floating">Description*</IonLabel>
            <IonTextarea required rows={2} />
          </IonItem>
          
          <IonItem>
            <IonLabel>Category*</IonLabel>
            <IonSelect interface="action-sheet" required>
              <IonSelectOption value="food">Food</IonSelectOption>
              <IonSelectOption value="transport">Transport</IonSelectOption>
              <IonSelectOption value="housing">Housing</IonSelectOption>
              <IonSelectOption value="utilities">Utilities</IonSelectOption>
              <IonSelectOption value="entertainment">Entertainment</IonSelectOption>
              <IonSelectOption value="other">Other</IonSelectOption>
            </IonSelect>
          </IonItem>
          
          <IonItem>
  <IonLabel>Date</IonLabel>
  <IonDatetime
    min="2000-01-01"
    max="2030-12-31"
    value={new Date().toISOString()}
    presentation="date" // or "date-time", "time", etc.
  />
</IonItem>
          
          <div style={{ marginTop: '30px' }}>
            <IonButton expand="block" type="submit">
              Save Expense
            </IonButton>
            <IonButton 
              expand="block" 
              fill="clear" 
              onClick={() => history.push('/dashboard')}
            >
              Cancel
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddExpense;