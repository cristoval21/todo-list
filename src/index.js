import './style.css';
import { buildMainUI } from './layouts/ScreenController.js';
import { buildSidebar } from './layouts/Sidebar.js';
import * as AddItemModal from './layouts/AddItemModal.js'
import { todoController } from './components/TodoController.js';

const pageContainer = document.querySelector('.page-container');

buildSidebar(pageContainer);
buildMainUI(pageContainer);
AddItemModal.buildModal();