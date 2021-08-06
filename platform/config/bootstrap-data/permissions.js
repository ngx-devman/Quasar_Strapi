/* eslint-disable quotes */
// Configure default permissions and roles for this environment
module.exports = [
  {
    name: 'Authenticated',
    type: 'authenticated',
    description: 'Default role given to authenticated user.',
    permissions: {
      application: {
        controllers: {
          live: {
            verify: { enabled: true }
          },
          activations: {
            find: { enabled: true },
            findone: { enabled: true },
            create: { enabled: true },
            count: { enabled: true },
            update: { enabled: true },
            delete: { enabled: true },
            populate: { enabled: true }
          },
          apps: {
            findone: { enabled: true },
            find: { enabled: true },
            count: { enabled: true }
          },
          currentuser: true,
          distribution: {
            count: { enabled: true },
            findone: { enabled: true },
            find: { enabled: true },
            create: { enabled: true },
            update: { enabled: true },
            delete: { enabled: true },
            updatesettings: { enabled: true },
            copy: { enabled: true }
          },
          embed: {
            domo: { enabled: true }
          },
          experience: {
            data: { enabled: true },
            index: { enabled: true }
          },
          organizations: false,
          production: false,
          property: false,
          'user-media': {
            create: { enabled: true },
            update: { enabled: true },
            find: { enabled: true },
            findone: { enabled: true },
            count: { enabled: true },
            delete: { enabled: true }
          },
          'user-media-folder': {
            create: { enabled: true },
            update: { enabled: true },
            find: { enabled: true },
            findone: { enabled: true },
            count: { enabled: true },
            delete: { enabled: true }
          },
          'user-app-block': {
            create: { enabled: true },
            update: { enabled: true },
            find: { enabled: true },
            findone: { enabled: true },
            count: { enabled: true },
            delete: { enabled: true }
          },
          updates: { byApp: { enabled: true } },
          template: {
            find: {enabled: true},
            findOne: {enabled: true},
            count: {enabled: true}
          },
          'template-block': {
            find: {enabled: true},
            findOne: {enabled: true},
          }
        }
      },
      upload: {
        controllers: {
          upload: false
        }
      },
      'users-permissions': {
        controllers: {
          auth: {
            callback: { enabled: true },
            forgotpassword: { enabled: true },
            emailconfirmation: { enabled: true },
            register: { enabled: true },
            connect: { enabled: true },
            logoutFromProvider: { enabled: true }
          },
          user: {
            me: { enabled: true }
          }
        }
      }
    }
  },

  {
    name: 'Public',
    type: 'public',
    description: 'Default role given to unauthenticated user.',
    permissions: {
      'users-permissions': {
        controllers: {
          auth: {
            callback: { enabled: true },
            connect: { enabled: true },
            forgotpassword: { enabled: true },
            register: { enabled: false },
            emailconfirmation: { enabled: true },
            sendemailconfirmation: { enabled: true },
            logoutFromProvider: { enabled: true }
          }
        }
      },
      upload: {
        controllers: {
          upload: {
            getsettings: { enabled: false },
            find: { enabled: false },
            destroy: { enabled: false },
            findone: { enabled: false },
            count: { enabled: false },
            search: { enabled: false },
            upload: { enabled: false },
            updatesettings: { enabled: false }
          }
        }
      },
      application: {
        controllers: {
          activations: {
            findone: { enabled: true },
            count: { enabled: true },
            find: { enabled: true },
            populate: { enabled: true },
            identifier: { enabled: true }
          },
          analytic: {
            create: { enabled: true }
          },
          production: {
            count: { enabled: true },
            findone: { enabled: true },
            find: { enabled: true },
            mapeidr: { enabled: true }
          },
          distribution: {
            findone: { enabled: true },
            find: { enabled: true },
            count: { enabled: true },
            delete: { enabled: false },
            updatesettings: { enabled: false },
            copy: { enabled: false }
          },
          administrator: {
            pulse: { enabled: true },
            config: { enabled: true }
          },
          experience: {
            data: { enabled: true },
            index: { enabled: true },
            method: { enabled: true }
          },
          'user-app-block': false,
        }
      }
    }
  },
  {
    name: 'Service Account - Storefront',
    type: 'serviceaccount-storefront',
    description: 'Service account for storefront.',
    permissions: {
      application: {
        controllers: {
          'user-app-block': {
            create: { enabled: false },
            update: { enabled: false },
            find: { enabled: false },
            findone: { enabled: true, policy: '' },
            count: { enabled: false },
            delete: { enabled: false }
          },
        }
      }
    }
  },
  {
    name: 'Service Account - IAM',
    type: 'serviceaccount-iam',
    description: 'Service account for IAM.',
    permissions: {
      'users-permissions': {
        controllers: {
          user: {
            count: { enabled: true },
            find: { enabled: true },
            findone: { enabled: true }
          },
          auth: {
            updatePasswordByServiceAccount: { enabled: true }
          }
        }
      }
    }
  }
];

