#!/bin/bash

sudo su -c "kubectl patch service frontend-service -p '{\"spec\":{\"selector\":{\"version\":\"blue\"}}}'"

