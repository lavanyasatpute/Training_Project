import { ErrorHandler, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar"

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private snackBar: MatSnackBar) {
    }

    handleError(error: any): void {
        console.error("Global Error Caught: ", error);

        this.snackBar.open(`from error handller : ${error}`, "Close", {
             duration: 5000,
              panelClass: ["error-snackBar"],
             });

    }
}
