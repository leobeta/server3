import './config/config';

import Logger from './utils/logger';
import app from './app';

app.listen(app.get('port'));

Logger.debug('Server listen on port ' + app.get('port'));