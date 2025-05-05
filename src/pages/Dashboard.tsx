import { 
  IonContent, 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonCard, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle, 
  IonButton,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const history = useHistory();
  const recentExpenses = [
    { id: 1, amount: 24.50, category: 'food', description: 'Lunch', date: '2023-06-15' },
    { id: 2, amount: 12.00, category: 'transport', description: 'Bus fare', date: '2023-06-14' }
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2 style={{ marginTop: 0 }}>Expense Overview</h2>
        
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>Current Balance</IonCardSubtitle>
                  <IonCardTitle>$2,450.00</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>This Month</IonCardSubtitle>
                  <IonCardTitle>$780.00</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div style={{ margin: '20px 0' }}>
          <IonButton expand="block" onClick={() => history.push('/add-expense')}>
            Add New Expense
          </IonButton>
        </div>

        <h3>Recent Expenses</h3>
        {recentExpenses.map(expense => (
          <IonCard key={expense.id} onClick={() => history.push(`/expenses`)}>
            <IonCardHeader>
              <IonCardSubtitle>
                {new Date(expense.date).toLocaleDateString()} • {expense.category}
              </IonCardSubtitle>
              <IonCardTitle>${expense.amount.toFixed(2)}</IonCardTitle>
              <p>{expense.description}</p>
            </IonCardHeader>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;