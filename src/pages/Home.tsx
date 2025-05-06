import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonAvatar,
  IonButton,
  IonItemGroup,
  IonItemDivider,
  IonModal,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonTextarea,
  IonAlert
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { menuController } from '@ionic/core';
import { 
  cashOutline, 
  walletOutline, 
  pieChartOutline,
  logOutOutline,
  personOutline,
  informationCircleOutline,
  addCircleOutline,
  documentTextOutline,
  homeOutline,
  restaurant,
  car,
  home,
  flash,
  film,
  medkit,
  cart,
  ellipsisHorizontal,
  trashOutline,
  createOutline
} from 'ionicons/icons';

// Define category and expense types
interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

const Home: React.FC = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([
    // Sample data for testing
    {
      id: '1',
      amount: 650,
      category: 'other',
      date: new Date().toISOString(),
      description: 'Red Horse'
    }
  ]);
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
    amount: 0,
    category: '',
    date: new Date().toISOString(),
    description: ''
  });
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Categories data
  const categories: Category[] = [
    { id: 'food', name: 'Food', icon: restaurant },
    { id: 'transport', name: 'Transport', icon: car },
    { id: 'housing', name: 'Housing', icon: home },
    { id: 'utilities', name: 'Utilities', icon: flash },
    { id: 'entertainment', name: 'Entertainment', icon: film },
    { id: 'health', name: 'Health', icon: medkit },
    { id: 'shopping', name: 'Shopping', icon: cart },
    { id: 'other', name: 'Other', icon: ellipsisHorizontal }
  ];

  // Calculate dashboard data
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = 10000 - totalExpenses;
  
  // Get top category
  const getTopCategory = () => {
    if (expenses.length === 0) return 'N/A';
    
    const categoryCounts = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.entries(categoryCounts).reduce(
      (max, [category, amount]) => amount > max.amount ? { category, amount } : max,
      { category: '', amount: 0 }
    );

    return categories.find(c => c.id === topCategory.category)?.name || 'N/A';
  };

  const handleLogout = async () => {
    await menuController.close();
    history.push('/login');
  };

  const handleNavigation = (path: string) => {
    menuController.close();
    history.push(path);
  };

  const handleInputChange = (field: keyof typeof newExpense, value: any) => {
    setNewExpense(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddExpense = () => {
    const expenseToAdd = {
      ...newExpense,
      id: Date.now().toString(),
      amount: parseFloat(newExpense.amount.toString()) || 0
    };
    
    setExpenses(prev => [...prev, expenseToAdd]);
    setNewExpense({
      amount: 0,
      category: '',
      date: new Date().toISOString(),
      description: ''
    });
    setShowModal(false);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setShowEditModal(true);
  };

  const handleUpdateExpense = () => {
    if (!editingExpense) return;
    
    setExpenses(prev => prev.map(exp => 
      exp.id === editingExpense.id ? editingExpense : exp
    ));
    setShowEditModal(false);
    setEditingExpense(null);
  };

  const confirmDelete = (id: string) => {
    setExpenseToDelete(id);
    setShowDeleteAlert(true);
  };

  const handleDeleteExpense = () => {
    if (!expenseToDelete) return;
    
    setExpenses(prev => prev.filter(exp => exp.id !== expenseToDelete));
    setExpenseToDelete(null);
    setShowDeleteAlert(false);
  };

  return (
    <>
      {/* Side Menu */}
      <IonMenu side="start" menuId="mainMenu" contentId="main-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonContent>
          {/* Profile Section */}
          <div className="ion-padding ion-text-center">
            <IonAvatar style={{ width: '80px', height: '80px', margin: '0 auto' }}>
              <img 
                src="https://ionicframework.com/docs/img/demos/avatar.svg" 
                alt="Profile" 
              />
            </IonAvatar>
            <h3 style={{ marginTop: '10px' }}>Just Jhong</h3>
          </div>

          {/* Main Menu Items */}
          <IonList lines="none">
            <IonItem button onClick={() => handleNavigation('/')}>
              <IonIcon icon={homeOutline} slot="start" />
              <IonLabel>Dashboard</IonLabel>
            </IonItem>

            {/* Quick Actions Section */}
            <IonItemGroup>
              <IonItemDivider>
                <IonLabel>Quick Actions</IonLabel>
              </IonItemDivider>
              
              <IonItem button onClick={() => setShowModal(true)}>
                <IonIcon icon={addCircleOutline} slot="start" color="primary" />
                <IonLabel>Add New Expense</IonLabel>
              </IonItem>
              
              <IonItem button onClick={() => handleNavigation('/reports')}>
                <IonIcon icon={documentTextOutline} slot="start" color="tertiary" />
                <IonLabel>View Reports</IonLabel>
              </IonItem>
            </IonItemGroup>

            {/* Other Sections */}
            <IonItem button onClick={() => handleNavigation('/profile')}>
              <IonIcon icon={personOutline} slot="start" />
              <IonLabel>Profile</IonLabel>
            </IonItem>
            
            <IonItem button onClick={() => handleNavigation('/about')}>
              <IonIcon icon={informationCircleOutline} slot="start" />
              <IonLabel>About</IonLabel>
            </IonItem>
          </IonList>

          {/* Logout at Bottom */}
          <IonList lines="none" style={{ marginTop: '20px' }}>
            <IonItem button onClick={handleLogout}>
              <IonIcon icon={logOutOutline} slot="start" color="danger" />
              <IonLabel color="danger">Logout</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      {/* Main Page */}
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton menu="mainMenu" />
            </IonButtons>
            <IonTitle>Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonContent className="ion-padding">
          {/* Welcome Header */}
          <h1 style={{ fontWeight: 'bold' }}>Welcome to Capstone Expenses</h1>
          <p className="ion-text-muted">Here's a quick overview of your finances.</p>

          {/* Dashboard Cards Grid */}
          <IonGrid>
            <IonRow>
              {/* Total Expenses Card */}
              <IonCol size="12" sizeMd="4">
                <IonCard color="danger" style={{ height: '100%' }}>
                  <IonCardHeader>
                    <IonIcon icon={cashOutline} size="large" />
                    <IonCardSubtitle>Total Expenses</IonCardSubtitle>
                    <IonCardTitle>₱{totalExpenses.toFixed(2)}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>

              {/* Remaining Budget Card */}
              <IonCol size="12" sizeMd="4">
                <IonCard color="success" style={{ height: '100%' }}>
                  <IonCardHeader>
                    <IonIcon icon={walletOutline} size="large" />
                    <IonCardSubtitle>Remaining Budget</IonCardSubtitle>
                    <IonCardTitle>₱{remainingBudget.toFixed(2)}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>

              {/* Top Categories Card */}
              <IonCol size="12" sizeMd="4">
                <IonCard color="tertiary" style={{ height: '100%' }}>
                  <IonCardHeader>
                    <IonIcon icon={pieChartOutline} size="large" />
                    <IonCardSubtitle>Top Categories</IonCardSubtitle>
                    <IonCardTitle>{getTopCategory()}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Empty State Message (when no data) */}
          {expenses.length === 0 ? (
            <div className="ion-text-center ion-padding">
              <p style={{ fontSize: '1.2em' }}>
                No expenses recorded yet. Start tracking to see insights!
              </p>
              <IonButton onClick={() => setShowModal(true)}>
                Add Your First Expense
              </IonButton>
            </div>
          ) : (
            <div className="ion-margin-top">
              <h3>Recent Expenses</h3>
              <IonList>
                {expenses.slice(0, 5).map(expense => (
                  <IonItem key={expense.id}>
                    <IonIcon 
                      icon={categories.find(c => c.id === expense.category)?.icon || ellipsisHorizontal} 
                      slot="start" 
                    />
                    <IonLabel>
                      <h3>{categories.find(c => c.id === expense.category)?.name || 'Other'}</h3>
                      <p>{expense.description || 'No description'}</p>
                      <p>{new Date(expense.date).toLocaleDateString()}</p>
                    </IonLabel>
                    <IonLabel slot="end" color="danger">
                      -₱{expense.amount.toFixed(2)}
                    </IonLabel>
                    <IonButton 
                      fill="clear" 
                      onClick={() => handleEditExpense(expense)}
                    >
                      <IonIcon icon={createOutline} />
                    </IonButton>
                    <IonButton 
                      fill="clear" 
                      color="danger" 
                      onClick={() => confirmDelete(expense.id)}
                    >
                      <IonIcon icon={trashOutline} />
                    </IonButton>
                  </IonItem>
                ))}
              </IonList>
            </div>
          )}
        </IonContent>
      </IonPage>

      {/* Add Expense Modal */}
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Add New Expense</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="stacked">Amount (₱)</IonLabel>
            <IonInput
              type="number"
              value={newExpense.amount}
              onIonChange={e => handleInputChange('amount', e.detail.value)}
              placeholder="0.00"
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Category</IonLabel>
            <IonSelect
              value={newExpense.category}
              placeholder="Select Category"
              onIonChange={e => handleInputChange('category', e.detail.value)}
            >
              {categories.map(category => (
                <IonSelectOption key={category.id} value={category.id}>
                  <IonIcon icon={category.icon} slot="start" />
                  {category.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonDatetime
              value={newExpense.date}
              onIonChange={e => handleInputChange('date', e.detail.value!)}
            ></IonDatetime>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Description (Optional)</IonLabel>
            <IonTextarea
              value={newExpense.description}
              onIonChange={e => handleInputChange('description', e.detail.value!)}
              placeholder="Add notes about this expense"
            ></IonTextarea>
          </IonItem>

          <IonButton 
            expand="block" 
            onClick={handleAddExpense} 
            className="ion-margin-top"
            disabled={!newExpense.amount || !newExpense.category}
          >
            Save Expense
          </IonButton>
        </IonContent>
      </IonModal>

      {/* Edit Expense Modal */}
      <IonModal isOpen={showEditModal} onDidDismiss={() => setShowEditModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Expense</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowEditModal(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {editingExpense && (
            <>
              <IonItem>
                <IonLabel position="stacked">Amount (₱)</IonLabel>
                <IonInput
                  type="number"
                  value={editingExpense.amount}
                  onIonChange={e => setEditingExpense({
                    ...editingExpense,
                    amount: parseFloat(e.detail.value!) || 0
                  })}
                  placeholder="0.00"
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Category</IonLabel>
                <IonSelect
                  value={editingExpense.category}
                  placeholder="Select Category"
                  onIonChange={e => setEditingExpense({
                    ...editingExpense,
                    category: e.detail.value
                  })}
                >
                  {categories.map(category => (
                    <IonSelectOption key={category.id} value={category.id}>
                      <IonIcon icon={category.icon} slot="start" />
                      {category.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
  <IonLabel position="stacked">Date</IonLabel>
  <IonDatetime
    value={editingExpense.date}
    onIonChange={e => {
      const selectedDate = e.detail.value;
      if (selectedDate) {
        setEditingExpense(prev => prev ? { ...prev, date: selectedDate.toString() } : prev);
      }
    }}
  ></IonDatetime>
</IonItem>


              <IonItem>
                <IonLabel position="stacked">Description (Optional)</IonLabel>
                <IonTextarea
                  value={editingExpense.description}
                  onIonChange={e => setEditingExpense({
                    ...editingExpense,
                    description: e.detail.value!
                  })}
                  placeholder="Add notes about this expense"
                ></IonTextarea>
              </IonItem>

              <IonButton 
                expand="block" 
                onClick={handleUpdateExpense} 
                className="ion-margin-top"
                disabled={!editingExpense.amount || !editingExpense.category}
              >
                Update Expense
              </IonButton>
            </>
          )}
        </IonContent>
      </IonModal>

      {/* Delete Confirmation Alert */}
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header={'Confirm Delete'}
        message={'Are you sure you want to delete this expense?'}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Delete',
            handler: handleDeleteExpense
          }
        ]}
      />
    </>
  );
};

export default Home;