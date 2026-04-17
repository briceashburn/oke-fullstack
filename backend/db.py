import os
import logging
from borneo import NoSQLHandle, NoSQLHandleConfig
from borneo.iam import SignatureProvider

logger = logging.getLogger(__name__)

_handle = None


def get_nosql_handle() -> NoSQLHandle:
    global _handle
    if _handle is not None:
        return _handle

    region = os.getenv("OCI_REGION", "us-chicago-1")
    compartment = os.getenv("OCI_COMPARTMENT_ID")
    use_instance_principal = os.getenv("USE_INSTANCE_PRINCIPAL", "false").lower() == "true"

    if use_instance_principal:
        logger.info("NoSQL: connecting via Resource Principal (region=%s)", region)
        provider = SignatureProvider.create_with_resource_principal()
    else:
        config_file = os.getenv("OCI_CONFIG_FILE", "~/.oci/config")
        key_file = os.getenv("OCI_KEY_FILE")
        logger.info("NoSQL: connecting via config file %s (region=%s)", config_file, region)
        if key_file:
            provider = SignatureProvider(config_file=config_file, profile_name="DEFAULT", private_key=key_file)
        else:
            provider = SignatureProvider(config_file=config_file)

    config = NoSQLHandleConfig(region, provider)
    if compartment:
        config.set_default_compartment(compartment)
    _handle = NoSQLHandle(config)
    logger.info("NoSQL: handle created")
    return _handle


def close_nosql_handle():
    global _handle
    if _handle:
        _handle.close()
        _handle = None
        logger.info("NoSQL: handle closed")
