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
import { useState, useEffect } from 'react';
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
import supabase from '../utils/supabaseClient'; // Make sure to configure your Supabase client

// Define category, expense, and budget types
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
  user_id: string;
}

interface Budget {
  id: string;
  amount: number;
  user_id: string;
}

const Home: React.FC = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [newBudgetAmount, setNewBudgetAmount] = useState(0);
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id' | 'user_id'>>({
    amount: 0,
    category: '',
    date: new Date().toISOString(),
    description: ''
  });
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [session, setSession] = useState<any>(null);

  // Categories data
  const categories: Category[] = [
    { id: 'food', name: 'Food', icon: restaurant },
    { id: 'transport', name: 'Transport', icon: car },
    { id: 'utilities', name: 'Utilities', icon: flash },
    { id: 'entertainment', name: 'Entertainment', icon: film },
    { id: 'health', name: 'Health', icon: medkit },
    { id: 'shopping', name: 'Shopping', icon: cart },
    { id: 'other', name: 'Other', icon: ellipsisHorizontal }
  ];

  // Load data when component mounts or session changes
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (!session) {
        history.push('/login');
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (!session) {
        history.push('/login');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [history]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchExpenses();
      fetchBudget();
    }
  }, [session]);

  const fetchExpenses = async () => {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', session.user.id)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching expenses:', error);
    } else {
      setExpenses(data || []);
    }
  };

  const fetchBudget = async () => {
    const { data, error } = await supabase
      .from('budgets')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (error) {
      // If no budget exists, create a default one
      if (error.code === 'PGRST116') {
        const { data: newBudget } = await supabase
          .from('budgets')
          .insert([{ user_id: session.user.id, amount: 10000 }])
          .select()
          .single();
        setBudget(newBudget);
      } else {
        console.error('Error fetching budget:', error);
      }
    } else {
      setBudget(data);
    }
  };

  // Calculate dashboard data
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = (budget?.amount || 10000) - totalExpenses;
  
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
    await supabase.auth.signOut();
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

  const handleAddExpense = async () => {
    if (!session?.user?.id) return;

    const { data, error } = await supabase
      .from('expenses')
      .insert([{
        ...newExpense,
        user_id: session.user.id,
        amount: parseFloat(newExpense.amount.toString()) || 0
      }])
      .select();

    if (error) {
      console.error('Error adding expense:', error);
    } else {
      setExpenses(prev => [data[0], ...prev]);
      setNewExpense({
        amount: 0,
        category: '',
        date: new Date().toISOString(),
        description: ''
      });
      setShowModal(false);
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setShowEditModal(true);
  };

  const handleUpdateExpense = async () => {
    if (!editingExpense || !session?.user?.id) return;
    
    const { error } = await supabase
      .from('expenses')
      .update(editingExpense)
      .eq('id', editingExpense.id)
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Error updating expense:', error);
    } else {
      setExpenses(prev => prev.map(exp => 
        exp.id === editingExpense.id ? editingExpense : exp
      ));
      setShowEditModal(false);
      setEditingExpense(null);
    }
  };

  const confirmDelete = (id: string) => {
    setExpenseToDelete(id);
    setShowDeleteAlert(true);
  };

  const handleDeleteExpense = async () => {
    if (!expenseToDelete || !session?.user?.id) return;
    
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', expenseToDelete)
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Error deleting expense:', error);
    } else {
      setExpenses(prev => prev.filter(exp => exp.id !== expenseToDelete));
      setExpenseToDelete(null);
      setShowDeleteAlert(false);
    }
  };

  const handleUpdateBudget = async () => {
    if (!session?.user?.id || !budget) return;

    const { data, error } = await supabase
      .from('budgets')
      .update({ amount: newBudgetAmount })
      .eq('id', budget.id)
      .eq('user_id', session.user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating budget:', error);
    } else {
      setBudget(data);
      setShowBudgetModal(false);
    }
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
            <h3 style={{ marginTop: '10px' }}>{session?.user?.email || 'User'}</h3>
          </div>

          <IonList lines="none">
            <IonItem button routerLink="/dashboard" routerDirection="root">
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

              {/* Remaining Budget Card - Now clickable to edit budget */}
              <IonCol size="12" sizeMd="4">
                <IonCard 
                  color="success" 
                  style={{ height: '100%' }}
                  button
                  onClick={() => {
                    setNewBudgetAmount(budget?.amount || 10000);
                    setShowBudgetModal(true);
                  }}
                >
                  <IonCardHeader>
                    <IonIcon icon={walletOutline} size="large" />
                    <IonCardSubtitle>Remaining Budget</IonCardSubtitle>
                    <IonCardTitle>₱{remainingBudget.toFixed(2)}</IonCardTitle>
                    <IonCardSubtitle>Click to edit budget</IonCardSubtitle>
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

      {/* Budget Edit Modal */}
      <IonModal isOpen={showBudgetModal} onDidDismiss={() => setShowBudgetModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Budget</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowBudgetModal(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="stacked">Monthly Budget (₱)</IonLabel>
            <IonInput
              type="number"
              value={newBudgetAmount}
              onIonChange={e => setNewBudgetAmount(parseFloat(e.detail.value!) || 0)}
              placeholder="Enter your monthly budget"
            ></IonInput>
          </IonItem>

          <IonButton 
            expand="block" 
            onClick={handleUpdateBudget} 
            className="ion-margin-top"
            disabled={!newBudgetAmount}
          >
            Update Budget
          </IonButton>
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