import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CommonService {
    change: boolean = false;
    change$ = new BehaviorSubject<boolean>(true)
}
