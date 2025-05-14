import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class DataController implements Controller {
   public path = '/api/data';
   public router = Router();

   constructor() {
       this.initializeRoutes();
   }

   private initializeRoutes() {
        this.router.post(`${this.path}/:id`, this.addData);
        this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
        this.router.get(`${this.path}/:id`, this.getElementById);
        this.router.get(`${this.path}/:id/latest`, this.getLargestElement);
        this.router.get(`${this.path}/:id/:num`, this.getRangeOfElements);
        this.router.delete(`${this.path}/all`, this.deleteAllElements);
        this.router.delete(`${this.path}/:id`, this.deleteElementById);
    }

        private addData = async (request: Request, response: Response) => {
        const { id } = request.params;
        const { elem } = request.body;
        if(isNaN(elem))
        {
            response.status(400).send("NaN");
        }
        else
        {
            testArr.push(elem)
            response.status(200).send("Dodano: " + id);
        }
        
    }
 
    private getLatestReadingsFromAllDevices = async (request: Request, response: Response) => {
        response.json(testArr);
    }

    private getElementById = async (request: Request, response: Response) => {
        const { id } = request.params;
        const index = Number(id)-1;
        if(isNaN(index) || index >= testArr.length || index < 0)
        {
            response.status(400).send("Error");
            return;
        }
        else
        {
            response.json(testArr[index]);
            return;
        }
    }

    private getLargestElement = async (request: Request, response: Response) => {
        const sortedArray = [...testArr].sort((a, b) => a < b ? 1:-1)
        response.json(sortedArray[0])
    }

    private getRangeOfElements = async (request: Request, response: Response, next: NextFunction) => {
        const id = parseInt(request.params.id);
        const num = parseInt(request.params.num);

        const arrayRange = testArr.slice(id, num);
        response.status(200).json(arrayRange)
    }; 

    private deleteAllElements = async (request: Request, response: Response) => {
        testArr = []
        response.status(200).send("Deleted all elements.")
    }

    private deleteElementById = async (request: Request, response: Response) => {
        const { id } = request.params
        const index = Number(id)-1
        if(isNaN(index) || index < 0 || index >= testArr.length)
        {
            response.status(400).send("Error");
            return;
        }
        else
        {
            const temp = testArr.splice(index, 1);
            testArr.splice(index, 1);
            response.status(200).send("Deleted element: " + temp);
            return;
        }
    }
 }
 
 export default DataController;