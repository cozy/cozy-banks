encrypted.tar.gz.gpg: __snapshots__/matching-*.spec.js.snap fixtures
	tar cvz --exclude .DS_Store __snapshots__/{matching-accounts,matching-transactions}.spec.js.snap fixtures | gpg -co encrypted.tar.gz.gpg

clean:
	rm -rf __snapshots__/{matching-accounts,matching-transactions}.spec.js.snap fixtures
