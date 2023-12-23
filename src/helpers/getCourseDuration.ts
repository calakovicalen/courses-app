export function getCourseDuration(durationInMinutes: number): string {
	const hours: number = Math.floor(durationInMinutes / 60);
	const minutes: number = durationInMinutes % 60;

	const formattedHours: string = hours < 10 ? '0' + hours : hours.toString();
	const formattedMinutes: string =
		minutes < 10 ? '0' + minutes : minutes.toString();

	const formattedDuration: string =
		hours === 1
			? `${formattedHours}:${formattedMinutes} hour`
			: `${formattedHours}:${formattedMinutes} hours`;

	return formattedDuration;
}
