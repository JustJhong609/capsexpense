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
    homeOutline,
    filmOutline,
  } from "ionicons/icons";
  
  import { useHistory } from "react-router-dom";
  
  // Mock Data
  const mockExpenses = [
    { id: "1", amount: 1500, category: "food", date: "2023-05-01", description: "Groceries" },
    { id: "2", amount: 200, category: "transport", date: "2023-05-02", description: "Taxi" },
    { id: "3", amount: 800, category: "housing", date: "2023-05-03", description: "Rent" },
    { id: "4", amount: 300, category: "food", date: "2023-05-05", description: "Restaurant" },
    { id: "5", amount: 100, category: "entertainment", date: "2023-05-10", description: "Movie" },
  ];
  
  const categories = [
    { id: "food", name: "Food", icon: restaurantOutline, color: "#FF6384" },
    { id: "transport", name: "Transport", icon: carOutline, color: "#36A2EB" },
    { id: "housing", name: "Housing", icon: homeOutline, color: "#FFCE56" },
    { id: "entertainment", name: "Entertainment", icon: filmOutline, color: "#4BC0C0" },
  ];
  
  const Reports: React.FC = () => {
    const history = useHistory();
  
    const totalSpending = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
    const spendingByCategory = mockExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);
  
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
                    <IonCardTitle>{mockExpenses.length}</IonCardTitle>
                    <IonCardSubtitle>Total Transactions</IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
  
              <IonCol size="12" sizeMd="6" sizeLg="4">
                <IonCard>
                  <IonCardHeader>
                    <IonIcon icon={calendarOutline} size="large" color="tertiary" />
                    <IonCardTitle>May 2023</IonCardTitle>
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
  
          <IonList lines="full">
            {Object.entries(spendingByCategory).map(([categoryId, amount]) => {
              const category = categories.find((c) => c.id === categoryId);
              const percentage = ((amount / totalSpending) * 100).toFixed(1);
  
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
  
          {/* Recent Transactions */}
          <h3 style={{ marginTop: "20px" }}>
            <IonIcon icon={listOutline} /> Recent Transactions
          </h3>
  
          <IonList lines="full">
            {mockExpenses.slice(0, 5).map((expense) => {
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
        </IonContent>
      </IonPage>
    );
  };
  
  export default Reports;
  