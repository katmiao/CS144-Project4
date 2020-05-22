import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myDatePipe'
})
export class MyDatePipePipe implements PipeTransform {

  transform(utc: string): string 
  {
    let date = new Date(utc);
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	let hour = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	let zeroMinutes = "";
	let zeroSeconds = "";
	if(minutes < 10)
	{
		zeroMinutes = "0";
	}

	if(seconds < 10)
	{
		zeroSeconds = "0";
	}

	let meridium = "AM";
	if(hour >= 12)
	{
		if(hour > 12)
			hour = hour % 12;
		meridium = "PM";
	}
    
    let ret = `${month}/${day}/${year}, ${hour}:${zeroMinutes}${minutes}:${zeroSeconds}${seconds} ${meridium}`;
	return ret;
  }
}
