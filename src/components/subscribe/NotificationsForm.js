import React, { PureComponent } from 'react';
import * as S from './layout';
class NotificationsForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      permission: 'default',
      isPushNotificationsSupported: false
    };
  }
  componentDidMount() {
    this.OneSignal = window.OneSignal || [];
    this.setupOneSignal();
  }
  /**
   * Render subscribe button
   * @param {('default'|'denied'|'granted')} permission - permission level
   * @returns {import('react').ReactElement} React Node
   */
  renderBtn = permission => {
    if (permission === 'default') {
      return (
        <S.SubmitBtn as="button" onClick={this.onSubscriptionBtnClick}>
          Subscribe
        </S.SubmitBtn>
      );
    } else if (permission === 'granted') {
      return (
        <h5>
          Already part of Notification Squad{' '}
          <span role="img" aria-label="relieved face">
            🎉
          </span>
        </h5>
      );
    } else if (permission === 'denied') {
      return (
        <h5>
          Thank You for your time.{' '}
          <span role="img" aria-label="relieved face">
            😌
          </span>
        </h5>
      );
    } else {
      console.warn('Unrecognised permission', permission);
    }
  };
  render() {
    const { permission, isPushNotificationsSupported } = this.state;
    if (!isPushNotificationsSupported) {
      return <div></div>;
    }
    return (
      <div>
        <S.SubSection>
          <S.Subtitle>Notifications</S.Subtitle>
          <sub>As it Happens.</sub>
        </S.SubSection>
        {this.renderBtn(permission)}
      </div>
    );
  }
  onSubscriptionBtnClick = event => {
    console.log("clicked");
    this.getSubscriptionState().then(state => {
      if (state.isPushEnabled) {
        /* Subscribed, opt them out */
        this.OneSignal.setSubscription(false);
      } else {
        if (state.isOptedOut) {
          /* Opted out, opt them back in */
          this.OneSignal.setSubscription(true);
        } else {
          /* Unsubscribed, subscribe them */
          this.OneSignal.registerForPushNotifications();
        }
      }
    });
    event.preventDefault();
  };
  setupOneSignal = () => {
    this.OneSignal.push(() => {
      if (!this.OneSignal.isPushNotificationsSupported()) {
        return;
      }
      
      this.OneSignal.init({
        appId: '500cf963-640a-4c2b-ba43-cb53f247b8d2',
        autoResubscribe: true,
        notifyButton: {
          enable: false,
        },
      });
      this.updateManageWebPushSubscriptionButton();
      this.OneSignal.on('subscriptionChange', function() {
        this.updateMangeWebPushSubscriptionButton();
      });
    });
  };
  updateManageWebPushSubscriptionButton = async () => {
    
    try {
      const state = await this.OneSignal.getNotificationPermission();
      this.setState({
        permission: state,
        isPushNotificationsSupported: true,
      });
    } catch (error) {
      console.error('Error getting notification status', error);
    }
  };
  /**
   * Find current subscription state
   **/
  async getSubscriptionState() {
    const result = await Promise.all([
      this.OneSignal.isPushNotificationsEnabled(),
      this.OneSignal.isOptedOut(),
    ]);
    const [isPushEnabled, isOptedOut] = result;
    return {
      isPushEnabled: isPushEnabled,
      isOptedOut: isOptedOut,
    };
  }
}
export default NotificationsForm;