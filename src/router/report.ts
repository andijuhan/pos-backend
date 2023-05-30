import express from 'express';
import { weeklyReport } from '../controller/report';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
   router.get('/report/weekly', isAuthenticated, weeklyReport);
};
