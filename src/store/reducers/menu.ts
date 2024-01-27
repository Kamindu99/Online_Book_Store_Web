import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project import

// types
import { MenuProps } from 'types/menu';

// initial state
const initialState: MenuProps = {
  openItem: ['dashboard'],
  openComponent: 'buttons',
  selectedID: null,
  drawerOpen: false,
  componentDrawerOpen: true,
  menu: {},
  error: null
};

// ==============================|| SLICE - MENU ||============================== //

export const fetchMenu = createAsyncThunk('', async () => {
  return {
    "dashboard": {
      "id": "group-dashboard",
      "title": "dashboard",
      "type": "group",
      "icon": "dashboard",
      "children": [
        {
          "id": "dashboard",
          "title": "dashboard",
          "type": "collapse",
          "icon": "dashboard",
          "children": [
            {
              "id": "default",
              "title": "default",
              "type": "item",
              "url": "/dashboard/default",
              "breadcrumbs": false
            },
            {
              "id": "analytics",
              "title": "analytics",
              "type": "item",
              "url": "/dashboard/analytics",
              "breadcrumbs": false
            }
          ]
        },
        {
          "id": "components",
          "title": "components",
          "type": "item",
          "url": "/components-overview/buttons",
          "icon": "components",
          "target": true,
          "chip": {
            "label": "new",
            "color": "primary",
            "size": "small",
            "variant": "combined"
          }
        }
      ]
    }
  }
});

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    activeItem(state, action) {
      state.openItem = action.payload.openItem;
    },

    activeID(state, action) {
      state.selectedID = action.payload;
    },

    activeComponent(state, action) {
      state.openComponent = action.payload.openComponent;
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload;
    },

    openComponentDrawer(state, action) {
      state.componentDrawerOpen = action.payload.componentDrawerOpen;
    },

    hasError(state, action) {
      state.error = action.payload;
    }
  },

  extraReducers(builder) {
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      state.menu = {
        "id": "group-dashboard",
        "title": "dashboard",
        "type": "group",
        "icon": "dashboard",
        "children": [
          {
            "id": "dashboard",
            "title": "dashboard",
            "type": "collapse",
            "icon": "dashboard",
            "children": [
              {
                "id": "default",
                "title": "default",
                "type": "item",
                "url": "/dashboard/default",
                "breadcrumbs": false
              },
              {
                "id": "analytics",
                "title": "analytics",
                "type": "item",
                "url": "/dashboard/analytics",
                "breadcrumbs": false
              }
            ]
          },
          {
            "id": "components",
            "title": "components",
            "type": "item",
            "url": "/components-overview/buttons",
            "icon": "components",
            "target": true,
            "chip": {
              "label": "new",
              "color": "primary",
              "size": "small",
              "variant": "combined"
            }
          }
        ]
      };
    });
  }
});

export default menu.reducer;

export const { activeItem, activeComponent, openDrawer, openComponentDrawer, activeID } = menu.actions;
