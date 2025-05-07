import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonList,
  IonItem,
} from "@ionic/react";
import {
  pieChartOutline,
  barChartOutline,
  calendarOutline,
  cashOutline,
  listOutline,
  arrowBack,
  restaurantOutline,
  carOutline,
  filmOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from '../utils/supabaseClient'; // Make sure to configure your Supabase client

// Categories - Removed housing
const categories = [
  { id: "food", name: "Food", icon: restaurantOutline, color: "#FF6384" },
  { id: "transport", name: "Transport", icon: carOutline, color: "#36A2EB" },
  { id: "entertainment", name: "Entertainment", icon: filmOutline, color: "#4BC0C0" },
];

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

const Reports: React.FC = () => {
  const history = useHistory();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState('');

  // Fetch expenses from Supabase
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          history.push('/login');
          return;
        }

        // Get current month and year for the report
        const now = new Date();
        setCurrentMonth(now.toLocaleString('default', { month: 'long', year: 'numeric' }));

        // Fetch expenses for the current month
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

        const { data, error } = await supabase
          .from('expenses')
          .select('*')
          .eq('user_id', session.user.id)
          .gte('date', startOfMonth)
          .lte('date', endOfMonth)
          .order('date', { ascending: false });

        if (error) throw error;

        setExpenses(data || []);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [history]);

  // Calculate report data
  const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const spendingByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
              <IonButton onClick={() => history.goBack()}>
                <IonIcon slot="icon-only" icon={arrowBack} />
              </IonButton>
            </IonButtons>
            <IonTitle>Expense Reports</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="ion-text-center ion-padding">
            <p>Loading reports...</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonButton onClick={() => history.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Expense Reports</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2 style={{ fontWeight: "bold" }}>Expense Analytics</h2>

        {/* Summary Cards */}
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6" sizeLg="4">
              <IonCard>
                <IonCardHeader>
                  <IonIcon icon={cashOutline} size="large" color="primary" />
                  <IonCardTitle>₱{totalSpending.toFixed(2)}</IonCardTitle>
                  <IonCardSubtitle>Total Spending</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6" sizeLg="4">
              <IonCard>
                <IonCardHeader>
                  <IonIcon icon={pieChartOutline} size="large" color="secondary" />
                  <IonCardTitle>{expenses.length}</IonCardTitle>
                  <IonCardSubtitle>Total Transactions</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6" sizeLg="4">
              <IonCard>
                <IonCardHeader>
                  <IonIcon icon={calendarOutline} size="large" color="tertiary" />
                  <IonCardTitle>{currentMonth}</IonCardTitle>
                  <IonCardSubtitle>Current Period</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Categories Breakdown */}
        <h3 style={{ marginTop: "20px" }}>
          <IonIcon icon={pieChartOutline} /> Spending by Category
        </h3>

        {expenses.length === 0 ? (
          <p>No expenses recorded for this period.</p>
        ) : (
          <IonList lines="full">
            {Object.entries(spendingByCategory).map(([categoryId, amount]) => {
              const category = categories.find((c) => c.id === categoryId);
              const percentage = totalSpending > 0 ? ((amount / totalSpending) * 100).toFixed(1) : '0';

              return (
                <IonItem key={categoryId}>
                  <IonIcon
                    icon={category?.icon}
                    slot="start"
                    style={{ color: category?.color }}
                  />
                  <IonLabel>
                    <h3>{category?.name || "Other"}</h3>
                    <p>{percentage}% of total</p>
                  </IonLabel>
                  <IonLabel slot="end">₱{amount.toFixed(2)}</IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        )}

        {/* Recent Transactions */}
        <h3 style={{ marginTop: "20px" }}>
          <IonIcon icon={listOutline} /> Recent Transactions
        </h3>

        {expenses.length === 0 ? (
          <p>No recent transactions to display.</p>
        ) : (
          <IonList lines="full">
            {expenses.slice(0, 5).map((expense) => {
              const category = categories.find((c) => c.id === expense.category);

              return (
                <IonItem key={expense.id}>
                  <IonIcon
                    icon={category?.icon}
                    slot="start"
                    style={{ color: category?.color }}
                  />
                  <IonLabel>
                    <h3>{category?.name || "Other"}</h3>
                    <p>{expense.description}</p>
                    <p>{new Date(expense.date).toLocaleDateString()}</p>
                  </IonLabel>
                  <IonLabel slot="end" color="danger">
                    -₱{expense.amount.toFixed(2)}
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Reports;