const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline',
    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'mdi:email-outline',
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'mdi:shield-outline',
    },
    {
      path: '/third-page',
      action: 'read',
      subject: 'acl-page',
      title: 'Third Page',
      icon: 'mdi:home-outline',
    }
  ]
}

export default navigation
