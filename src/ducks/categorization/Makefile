encrypted.tar.gz.gpg: __snapshots__/services-*.spec.js.snap fixtures
	tar cvz --exclude .DS_Store __snapshots__ fixtures | gpg -co encrypted.tar.gz.gpg

clean:
	rm -rf __snapshots__ fixtures
