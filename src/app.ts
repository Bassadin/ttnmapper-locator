import express, { Application } from 'express';
import pinoHttp from 'pino-http';
import logger from '@/middleware/logger';

// Routes
import BaseRoutes from '@/routes/base';
import TTNMapperDatapointsRoutes from '@/routes/ttnmapper_datapoints';
import DevicesRoutes from '@/routes/devices';
import DeviceGPSDatapointsRoutes from '@/routes/device_gps_datapoints';
import GatewaysRoutes from '@/routes/gateways';

// Auth middleware
import apiKeyAuthMiddleware from '@/middleware/apiKeyAuth';

// Error handler
import prismaErrorHandler from '@/middleware/prismaErrorHandler';
import catchAllErrorHandler from '@/middleware/catchAllErrorHandler';

// Scheduled jobs
import GetNewTTNMapperDataJob from '@/scheduledFunctions/GetNewTTNMapperDataJob';
import DeleteEmptyDeviceGpsDatapointsJob from '@/scheduledFunctions/DeleteEmptyDeviceGpsDatapointsJob';
import CleanGpsDatapointsJob from './scheduledFunctions/CleanGpsDatapointsJob';
import CalculatePerGatewayLinearRegressionJob from './scheduledFunctions/CalculatePerGatewayLinearRegression';

// Fastify instance
const app: Application = express();

// CORS
import cors from 'cors';

/* istanbul ignore next  */
const pinoHttpLogger = pinoHttp({
    logger: logger,
    autoLogging: {
        ignore: (req) => ['/healthcheck', '/metrics'].includes(<string>req.url),
    },
});

/* istanbul ignore next  */
if (process.env.NODE_ENV != 'test') {
    app.use(pinoHttpLogger);
}

// Body parser
app.use(express.json());

// CORS
app.use(cors());

// Register Routes
app.use('/', BaseRoutes);
app.use('/ttnmapper_datapoints', apiKeyAuthMiddleware, TTNMapperDatapointsRoutes);
app.use('/devices', apiKeyAuthMiddleware, DevicesRoutes);
app.use('/device_gps_datapoints', apiKeyAuthMiddleware, DeviceGPSDatapointsRoutes);
app.use('/gateways', apiKeyAuthMiddleware, GatewaysRoutes);

// Error handler
app.use(prismaErrorHandler);
app.use(catchAllErrorHandler);

// Init scheduled jobs
/* istanbul ignore next  */
if (process.env.NODE_ENV != 'test') {
    GetNewTTNMapperDataJob.getInstance().initScheduledJob();
    DeleteEmptyDeviceGpsDatapointsJob.getInstance().initScheduledJob();
    CleanGpsDatapointsJob.getInstance().initScheduledJob();
    CalculatePerGatewayLinearRegressionJob.getInstance().initScheduledJob();
} else {
    logger.warn('Scheduled jobs are not running in test environment');
}

export default app;
