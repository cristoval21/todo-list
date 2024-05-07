import './style.css';
import { addMainUI } from './layouts/ScreenController.js';
import { addSidebar } from './layouts/Sidebar.js';
import * as AddItemModal from './layouts/AddItemModal.js';
import * as EditItemModal from './layouts/EditItemModal.js';

const pageContainer = document.querySelector('.page-container');

addSidebar(pageContainer);
addMainUI(pageContainer);
AddItemModal.addModal();
EditItemModal.addModal();