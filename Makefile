publish: 
	@npm publish --access public
test:
	@npm test
	@make coverage-report
coverage-report:
	@open coverage/lcov-report/index.html
