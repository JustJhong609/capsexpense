import { 
  IonContent, 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonNote, 
  IonBadge,
  IonButtons,
  IonButton,
  IonIcon
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const ExpensesList: React.FC = () => {
  const history = useHistory();
  const expenses = [
    { id: 1, amount: 24.50, category: 'food', description: 'Lunch with team', date: '2023-06-15' },
    { id: 2, amount: 12.00, category: 'transport', description: 'Bus fare', date: '2023-06-14' },
    { id: 3, amount: 45.30, category: 'shopping', description: 'Weekly groceries', date: '2023-06-12' },
    { id: 4, amount: 120.00, category: 'housing', description: 'Internet bill', date: '2023-06-10' },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      food: 'success',
      transport: 'warning',
      housing: 'danger',
      shopping: 'primary',
      utilities: 'secondary',
      entertainment: 'tertiary',
      other: 'medium'
    };
    return colors[category] || 'medium';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>All Expenses</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/add-expense')}>
              <IonIcon slot="icon-only" icon={add} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="full">
          {expenses.map((expense) => (
            <IonItem key={expense.id} onClick={() => console.log('View details', expense.id)}>
              <IonBadge slot="start" color={getCategoryColor(expense.category)}>
                {expense.category.charAt(0).toUpperCase()}
              </IonBadge>
              <IonLabel>
                <h3>{expense.description}</h3>
                <p>{new Date(expense.date).toLocaleDateString()}</p>
              </IonLabel>
              <IonNote slot="end" color="primary">
                ${expense.amount.toFixed(2)}
              </IonNote>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ExpensesList;