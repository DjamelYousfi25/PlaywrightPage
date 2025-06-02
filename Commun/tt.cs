
Given(/^je suis sur la page de creatin$/, () => {
	return true;
});

When(/^je rensen "([^"]*)"$/, (args1) => {
	console.log(args1);
	return true;
});

When(/^je rensen 'sdsdsdsd'$/, () => {
	return true;
});
