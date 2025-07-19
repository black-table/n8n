# Nightly Build and Test Failures Analysis

## Executive Summary

The nightly builds and tests are failing due to multiple interconnected issues primarily related to:

1. **Python distutils deprecation in Node.js 22 environments**
2. **Recent workflow configuration changes**
3. **Dependency build failures**
4. **Environment compatibility issues**

## Root Cause Analysis

### 1. Primary Issue: Python distutils Missing

**Problem**: The sqlite3 Node.js package fails to build because Python `distutils` module is no longer available in Python 3.12+ (which is the default in Node.js 22 environments).

**Error Pattern**:
```
ModuleNotFoundError: No module named 'distutils'
gyp ERR! configure error 
gyp ERR! stack Error: `gyp` failed with exit code: 1
```

**Impact**: This prevents the installation of native dependencies, causing the build process to fail.

### 2. Environment Configuration Issues

**Node.js Version**: The workflows use Node.js 22.x, which comes with Python 3.12+ in GitHub Actions runners.

**GitHub Actions Changes**: Recent changes to GitHub Actions moved from Ubuntu 22.04 to 24.04, which includes Python 3.12 by default and removes the `distutils` module.

### 3. Recent Workflow Modifications

**File**: `.github/workflows/update-and-build.yml`

**Recent Changes** (5 commits in the last few days):
- Multiple modifications to the build artifact handling
- Changes to directory patterns: `packages/**/dist` → `packages/frontend/**/dist`
- Addition of debug steps for CLI files
- Specific package targeting instead of wildcard patterns

These changes suggest active troubleshooting of build artifact collection issues.

## Affected Workflows

### 1. Docker Nightly Image CI
- **File**: `.github/workflows/docker-images-nightly.yml`
- **Schedule**: Daily at midnight UTC
- **Purpose**: Builds and pushes nightly Docker images
- **Status**: Likely failing due to build process issues

### 2. Test Workflows Nightly
- **File**: `.github/workflows/test-workflows-nightly.yml`
- **Schedule**: Daily at 2 AM UTC
- **Purpose**: Runs comprehensive workflow tests
- **Dependencies**: Requires successful build and sqlite3 installation

### 3. Benchmark Nightly
- **File**: `.github/workflows/benchmark-nightly.yml`
- **Schedule**: Multiple times daily (1:30, 2:30, 3:30 AM UTC)
- **Purpose**: Performance benchmarking
- **Dependencies**: Requires Docker images and infrastructure

## Technical Details

### Build Process Dependencies
```json
{
  "node": ">=20.15",
  "pnpm": ">=10.2.1",
  "engines": {
    "node": "22.x"
  }
}
```

### Test Infrastructure
- **Test Workflows**: 926 workflows in skipList.json
- **Credentials**: Required for workflow execution
- **Snapshots**: Stored test expectations for comparison
- **Environment**: Requires SQLite, GraphicsMagick, and other system dependencies

### Docker Build Configuration
- **Base Image**: n8nio/base:${NODE_VERSION}
- **Release Type**: nightly
- **Platforms**: linux/amd64, linux/arm64
- **Build Args**: N8N_RELEASE_TYPE=nightly

## Solutions

### Immediate Fix (High Priority)

1. **Add Python distutils compatibility** to GitHub Actions workflows:
   ```yaml
   - name: Install Python dependencies
     run: |
       sudo apt update
       sudo apt install -y python3-setuptools python3-dev build-essential
   ```

2. **Alternative approach**: Use the `standard-distutils` package:
   ```yaml
   - name: Install distutils alternative
     run: |
       pip install standard-distutils
   ```

### Workflow Improvements (Medium Priority)

3. **Pin Python version** in workflows to avoid future compatibility issues:
   ```yaml
   - name: Setup Python
     uses: actions/setup-python@v4
     with:
       python-version: '3.11'  # Pin to version with distutils
   ```

4. **Add dependency installation step** in setup-and-build action:
   ```yaml
   - name: Install system dependencies
     run: |
       sudo apt update
       sudo apt install -y python3-setuptools build-essential
   ```

### Long-term Solutions (Low Priority)

5. **Upgrade sqlite3 dependency** to a version that doesn't require distutils
6. **Consider using better-sqlite3** as an alternative to sqlite3
7. **Docker base image updates** to include proper Python setup

## Implementation Priority

### Critical (Fix Immediately)
- [ ] Add Python setuptools installation to nightly workflows
- [ ] Test nightly Docker build manually
- [ ] Verify test workflow execution

### Important (Fix This Week)
- [ ] Update setup-and-build action with system dependencies
- [ ] Pin Python version in all workflows
- [ ] Add error handling for build failures

### Enhancement (Future)
- [ ] Evaluate sqlite3 alternatives
- [ ] Optimize Docker build process
- [ ] Improve error reporting for nightly builds

## Monitoring

### Workflow Status Checks
1. Monitor `.github/workflows/docker-images-nightly.yml` execution
2. Check `.github/workflows/test-workflows-nightly.yml` success rate
3. Verify `.github/workflows/benchmark-nightly.yml` completion

### Key Metrics
- Build success rate
- Test pass rate
- Docker image availability
- Benchmark completion time

## References

- [Python distutils deprecation](https://peps.python.org/pep-0632/)
- [GitHub Actions Ubuntu 24.04 migration](https://github.blog/changelog/2024-03-07-github-actions-all-actions-will-run-on-node20-instead-of-node16-by-default/)
- [Node.js 22 compatibility issues](https://nodejs.org/en/blog/release/v22.0.0)
- [Python deadlib project](https://github.com/python-deadlib/python-deadlib)