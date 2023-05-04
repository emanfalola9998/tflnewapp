export interface linesInterface {
  $type: string;
  id: string;
  operationType:number;
  vehicleId:string;
  naptanId: string;
  stationName: string;
  lineId:string;
  lineName:string;
  platformName: string;
  direction: string;
        bearing: string;
        destinationNaptanId: string;
        destinationName: string;
        timestamp: string;
        timeToStation: number;
        currentLocation: string;
        towards: string;
        expectedArrival: string;
        timeToLive: string;
        modeName: string;
        timing: {
            $type: string;
            countdownServerAdjustment: string;
            source: string;
            insert: string;
            read: string;
            sent: string;
            received: string;
        }
    }

