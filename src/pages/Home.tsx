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
  IonItemDivider
} from '@ionic/react';
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
  homeOutline
} from 'ionicons/icons';

const Home: React.FC = () => {
  const history = useHistory();

  const handleLogout = async () => {
    await menuController.close();
    history.push('/login');
  };

  const handleNavigation = (path: string) => {
    menuController.close();
    history.push(path);
  };

  // Mock data (replace with your actual data later)
  const dashboardData = {
    totalExpenses: 0,
    remainingBudget: 0,
    topCategories: ['N/A'],
  };

  return (
    <>
      {/* Enhanced Side Menu */}
      <IonMenu side="start" menuId="mainMenu" contentId="main-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonContent>
          {/* Profile Section - Removed from bottom, kept at top */}
          <div className="ion-padding ion-text-center">
            <IonAvatar style={{ width: '80px', height: '80px', margin: '0 auto' }}>
              <img 
                src="https://ionicframework.com/docs/img/demos/avatar.svg" 
                alt="Profile" 
              />
            </IonAvatar>
            <h3 style={{ marginTop: '10px' }}>User Name</h3>
          </div>

          {/* Main Menu Items */}
          <IonList lines="none">
            {/* Dashboard Item - Now properly navigates to Dashboard */}
            <IonItem button onClick={() => handleNavigation('/dashboard')}>
              <IonIcon icon={homeOutline} slot="start" />
              <IonLabel>Dashboard</IonLabel>
            </IonItem>

            {/* Quick Actions Section */}
            <IonItemGroup>
              <IonItemDivider>
                <IonLabel>Quick Actions</IonLabel>
              </IonItemDivider>
              
              <IonItem button onClick={() => alert('Open expense modal')}>
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

          {/* Only Logout at Bottom */}
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
                    <IonCardTitle>₱{dashboardData.totalExpenses.toFixed(2)}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>

              {/* Remaining Budget Card */}
              <IonCol size="12" sizeMd="4">
                <IonCard color="success" style={{ height: '100%' }}>
                  <IonCardHeader>
                    <IonIcon icon={walletOutline} size="large" />
                    <IonCardSubtitle>Remaining Budget</IonCardSubtitle>
                    <IonCardTitle>₱{dashboardData.remainingBudget.toFixed(2)}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>

              {/* Top Categories Card */}
              <IonCol size="12" sizeMd="4">
                <IonCard color="tertiary" style={{ height: '100%' }}>
                  <IonCardHeader>
                    <IonIcon icon={pieChartOutline} size="large" />
                    <IonCardSubtitle>Top Categories</IonCardSubtitle>
                    <IonCardTitle>
                      {dashboardData.topCategories[0]}
                    </IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Empty State Message (when no data) */}
          {dashboardData.totalExpenses === 0 && (
            <div className="ion-text-center ion-padding">
              <p style={{ fontSize: '1.2em' }}>
                No expenses recorded yet. Start tracking to see insights!
              </p>
            </div>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;