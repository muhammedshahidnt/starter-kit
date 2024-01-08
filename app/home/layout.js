// const Layout = ({ children }) => {
//     return (
//       <div>
//         {children}
//       </div>
//     )
//   }
  
//   export default Layout

// ** Next Imports
"use client"
import Head from 'next/head'
import { Router } from 'next/router'





// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports

import { defaultACLObj } from '@/app/configs/acl'
import themeConfig from '@/app/configs/themeConfig'

// ** Fake-DB Import
// import '@/app/@fake-db'A

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from '@/app/layouts/UserLayout'
import AclGuard from '@/app/@core/components/auth/AclGuard'
import ThemeComponent from '@/app/@core/theme/ThemeComponent'
import AuthGuard from '@/app/@core/components/auth/AuthGuard'
import GuestGuard from '@/app/@core/components/auth/GuestGuard'

// ** Spinner Import
import Spinner from '@/app/@core/components/spinner'

// ** Contexts
import { AuthProvider } from '@/app/context/AuthContext'
import { SettingsConsumer, SettingsProvider } from '@/app/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from '@/app/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from '@/app/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
// import 'react-perfect-scrollbar/dist/css/styles.css'
import '@/app/iconify-bundle/icons-bundle-react'

// ** Global css styles
// import '../../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const contentHeightFixed = Component?.contentHeightFixed ?? false

  const getLayout =
  Component && Component.getLayout ? Component.getLayout : (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>);
const setConfig = Component && Component.setConfig ? Component.setConfig : undefined;
const authGuard = Component && Component.authGuard !== undefined ? Component.authGuard : true;
const guestGuard = Component && Component.guestGuard !== undefined ? Component.guestGuard : false;
const aclAbilities = Component && Component.acl ? Component.acl : defaultACLObj;

  return (
    
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
          <meta
            name='description'
            content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
          />
          <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>

        <AuthProvider>
          <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    <Guard authGuard={authGuard} guestGuard={guestGuard}>
                      <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard} authGuard={authGuard}>
                        {getLayout(<Component {...pageProps} />)}
                      </AclGuard>
                    </Guard>
                    <ReactHotToast>
                      <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                    </ReactHotToast>
                  </ThemeComponent>
                )
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </AuthProvider>
      </CacheProvider>
   
  )
}

export default App
